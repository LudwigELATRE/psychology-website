<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\UserRegistrationService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class AuthController extends AbstractController
{
    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function register(
        Request $request,
        UserRegistrationService $registrationService
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        // Validation des données
        $validationError = $registrationService->validateRegistrationData($data);
        if ($validationError) {
            return new JsonResponse($validationError, Response::HTTP_BAD_REQUEST);
        }

        // Création de l'utilisateur
        $user = $registrationService->createUser($data);

        // Validation de l'entité
        $entityValidationError = $registrationService->validateUser($user);
        if ($entityValidationError) {
            return new JsonResponse($entityValidationError, Response::HTTP_BAD_REQUEST);
        }

        // Sauvegarde
        try {
            if (!$registrationService->persistUser($user)) {
                return new JsonResponse(['message' => 'Erreur lors de la création du compte'], Response::HTTP_INTERNAL_SERVER_ERROR);
            }

            $responseData = $registrationService->generateUserResponse($user);
            return new JsonResponse($responseData, Response::HTTP_CREATED);

        } catch (\Exception $e) {
            $errorResponse = $registrationService->handleDatabaseError($e);
            return new JsonResponse(['message' => $errorResponse['message']], $errorResponse['status']);
        }
    }

    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(
        Request $request,
        UserPasswordHasherInterface $passwordHasher,
        EntityManagerInterface $entityManager,
        JWTTokenManagerInterface $jwtManager
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        if (!$data || !isset($data['email']) || !isset($data['password'])) {
            return new JsonResponse(['message' => 'Email et mot de passe requis'], Response::HTTP_BAD_REQUEST);
        }

        $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $data['email']]);

        if (!$user || !$passwordHasher->isPasswordValid($user, $data['password'])) {
            return new JsonResponse(['message' => 'Email ou mot de passe incorrect'], Response::HTTP_UNAUTHORIZED);
        }

        $token = $jwtManager->create($user);

        return new JsonResponse([
            'token' => $token,
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'firstName' => $user->getFirstName(),
                'lastName' => $user->getLastName(),
                'roles' => $user->getRoles(),
            ]
        ]);
    }


    #[Route('/api/me', name: 'api_me', methods: ['GET'])]
    public function me(): JsonResponse
    {
        $user = $this->getUser();
        
        if (!$user instanceof User) {
            return new JsonResponse(['message' => 'Non authentifié'], Response::HTTP_UNAUTHORIZED);
        }

        return new JsonResponse([
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'firstName' => $user->getFirstName(),
            'lastName' => $user->getLastName(),
            'roles' => $user->getRoles(),
            'googleId' => $user->getGoogleId(),
        ]);
    }
}