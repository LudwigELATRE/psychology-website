<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use League\OAuth2\Client\Provider\Exception\IdentityProviderException;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class GoogleController extends AbstractController
{
    #[Route('/connect/google', name: 'connect_google_start')]
    public function connectAction(ClientRegistry $clientRegistry): Response
    {
        error_log('🚀 Démarrage authentification Google - redirect vers Google');
        return $clientRegistry
            ->getClient('google')
            ->redirect(
                ['openid', 'email', 'profile'],
            []
        );
    }

    #[Route('/connect/google/check', name: 'connect_google_check')]
    public function connectCheckAction(
        Request $request, 
        ClientRegistry $clientRegistry, 
        EntityManagerInterface $entityManager,
        TokenStorageInterface $tokenStorage,
        JWTTokenManagerInterface $jwtManager
    ): Response {
        try {
            error_log('🔄 Callback Google reçu - début traitement');
            
            // Vérifier si on a bien le code d'autorisation
            $code = $request->query->get('code');
            if (!$code) {
                $error = $request->query->get('error');
                $errorDescription = $request->query->get('error_description');
                
                error_log('❌ Pas de code d\'autorisation - error: ' . $error . ', description: ' . $errorDescription);
                $this->addFlash('error', 'Erreur OAuth: ' . ($errorDescription ?: $error ?: 'Aucun code d\'autorisation reçu'));
                return $this->redirectToRoute('react_app');
            }
            
            error_log('✅ Code d\'autorisation reçu: ' . substr($code, 0, 20) . '...');

            $client = $clientRegistry->getClient('google');
            $user = $client->fetchUser();

            // Debug : voir toutes les données Google
            error_log('🔍 Google User data: ' . json_encode($user->toArray()));

            // Récupération des informations utilisateur depuis Google
            $googleId = $user->getId();
            $email = $user->getEmail();
            
            // Essayons différentes méthodes pour récupérer le nom
            $firstName = '';
            $lastName = '';
            $avatar = null;
            
            $userData = $user->toArray();
            error_log('📋 User array keys: ' . implode(', ', array_keys($userData)));
            
            if (isset($userData['given_name'])) {
                $firstName = $userData['given_name'];
            }
            if (isset($userData['family_name'])) {
                $lastName = $userData['family_name'];
            }
            if (isset($userData['name']) && empty($firstName) && empty($lastName)) {
                $nameParts = explode(' ', $userData['name'], 2);
                $firstName = $nameParts[0] ?? '';
                $lastName = $nameParts[1] ?? '';
            }
            if (isset($userData['picture'])) {
                $avatar = $userData['picture'];
            }
            
            // Si pas de firstName/lastName, utiliser l'email comme fallback
            if (empty($firstName) && empty($lastName)) {
                $firstName = explode('@', $email)[0] ?? 'Utilisateur';
                $lastName = 'Google';
            }
            
            error_log('👤 Données extraites - firstName: ' . $firstName . ', lastName: ' . $lastName . ', avatar: ' . ($avatar ?? 'none'));

            // Recherche d'un utilisateur existant avec ce Google ID
            $existingUser = $entityManager->getRepository(User::class)->findOneBy(['googleId' => $googleId]);
            
            if (!$existingUser) {
                // Recherche d'un utilisateur existant avec le même email
                $existingUser = $entityManager->getRepository(User::class)->findOneBy(['email' => $email]);
                
                if ($existingUser) {
                    // Associer le compte Google à l'utilisateur existant
                    $existingUser->setGoogleId($googleId);
                    $existingUser->setIsVerified(true);
                } else {
                    // Créer un nouvel utilisateur
                    $existingUser = new User();
                    $existingUser->setEmail($email);
                    $existingUser->setFirstName($firstName);
                    $existingUser->setLastName($lastName);
                    $existingUser->setGoogleId($googleId);
                    $existingUser->setIsVerified(true);
                    $existingUser->setRoles(['ROLE_USER']);
                    
                    // Mot de passe aléatoire pour les comptes OAuth (non utilisé)
                    $existingUser->setPassword(bin2hex(random_bytes(32)));
                }
                
                $entityManager->persist($existingUser);
                $entityManager->flush();
            }
            
            error_log('👤 Utilisateur trouvé/créé - ID: ' . $existingUser->getId() . ', Email: ' . $existingUser->getEmail());

            // Authentifier l'utilisateur manuellement pour Symfony
            $token = new UsernamePasswordToken(
                $existingUser,
                'main',
                $existingUser->getRoles()
            );
            $tokenStorage->setToken($token);

            error_log('🔒 Token Symfony stocké, tentative génération JWT...');
            error_log('👤 User avant JWT: ID=' . $existingUser->getId() . ', Roles=' . json_encode($existingUser->getRoles()));
            
            // Générer un JWT pour le frontend React (pour tous les utilisateurs)
            $jwtToken = $jwtManager->create($existingUser);
            
            error_log('✅ JWT généré avec succès');
            
            // Rediriger vers l'app React avec le token et les données utilisateur en paramètres
            $userData = [
                'id' => $existingUser->getId(),
                'email' => $existingUser->getEmail(),
                'firstName' => $existingUser->getFirstName(),
                'lastName' => $existingUser->getLastName(),
                'roles' => $existingUser->getRoles(),
                'googleId' => $existingUser->getGoogleId(),
            ];
            
            // Debug logs
            error_log('🔐 JWT Token généré: ' . substr($jwtToken, 0, 50) . '...');
            error_log('👤 User data: ' . json_encode($userData));
            
            $redirectUrl = sprintf(
                '/app?auth_success=1&token=%s&user=%s',
                urlencode($jwtToken),
                urlencode(base64_encode(json_encode($userData)))
            );
            
            error_log('📍 Redirect URL: ' . $redirectUrl);
            
            return $this->redirect($redirectUrl);

        } catch (IdentityProviderException $e) {
            error_log('❌ IdentityProviderException: ' . $e->getMessage());
            $this->addFlash('error', 'Erreur lors de la connexion avec Google : ' . $e->getMessage());
            return $this->redirectToRoute('react_app');
        } catch (\Exception $e) {
            error_log('❌ Exception générale: ' . $e->getMessage() . ' - Trace: ' . $e->getTraceAsString());
            $this->addFlash('error', 'Erreur inattendue : ' . $e->getMessage());
            return $this->redirectToRoute('react_app');
        }
    }
}