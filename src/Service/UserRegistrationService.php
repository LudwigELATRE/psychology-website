<?php

namespace App\Service;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class UserRegistrationService
{
    private EntityManagerInterface $entityManager;
    private UserPasswordHasherInterface $passwordHasher;
    private ValidatorInterface $validator;
    private JWTTokenManagerInterface $jwtManager;

    public function __construct(
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher,
        ValidatorInterface $validator,
        JWTTokenManagerInterface $jwtManager
    ) {
        $this->entityManager = $entityManager;
        $this->passwordHasher = $passwordHasher;
        $this->validator = $validator;
        $this->jwtManager = $jwtManager;
    }

    public function validateRegistrationData(array $data): ?array
    {
        if (!$data) {
            return ['message' => 'Données JSON invalides'];
        }

        $requiredFields = ['firstName', 'lastName', 'email', 'password'];
        foreach ($requiredFields as $field) {
            if (empty($data[$field])) {
                return ['message' => "Le champ {$field} est requis"];
            }
        }

        if (isset($data['confirmPassword']) && $data['password'] !== $data['confirmPassword']) {
            return ['message' => 'Les mots de passe ne correspondent pas'];
        }

        return null;
    }

    public function createUser(array $data): User
    {
        $user = new User();
        $user->setFirstName($data['firstName']);
        $user->setLastName($data['lastName']);
        $user->setEmail($data['email']);

        $hashedPassword = $this->passwordHasher->hashPassword($user, $data['password']);
        $user->setPassword($hashedPassword);

        return $user;
    }

    public function validateUser(User $user): ?array
    {
        $errors = $this->validator->validate($user);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[] = $error->getMessage();
            }
            return ['message' => 'Erreurs de validation', 'errors' => $errorMessages];
        }

        return null;
    }

    public function persistUser(User $user): bool
    {
        try {
            $this->entityManager->persist($user);
            $this->entityManager->flush();
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    public function generateUserResponse(User $user): array
    {
        $token = $this->jwtManager->create($user);

        return [
            'message' => 'Compte créé avec succès',
            'token' => $token,
            'user' => [
                'id' => $user->getId(),
                'email' => $user->getEmail(),
                'firstName' => $user->getFirstName(),
                'lastName' => $user->getLastName(),
                'roles' => $user->getRoles(),
            ]
        ];
    }

    public function handleDatabaseError(\Exception $e): array
    {
        if (str_contains($e->getMessage(), 'UNIQUE constraint failed')) {
            return ['message' => 'Un compte avec cet email existe déjà', 'status' => Response::HTTP_CONFLICT];
        }
        
        return ['message' => 'Erreur lors de la création du compte', 'status' => Response::HTTP_INTERNAL_SERVER_ERROR];
    }
}