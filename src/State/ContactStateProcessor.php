<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Contact;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;

/**
 * State Processor pour la création de Contact.
 * Lie automatiquement le contact à un utilisateur existant si l'email correspond.
 */
class ContactStateProcessor implements ProcessorInterface
{
    public function __construct(
        private EntityManagerInterface $entityManager,
    ) {
    }

    /**
     * @param Contact $data
     */
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): Contact
    {
        // Chercher si un utilisateur existe avec cet email
        $user = $this->entityManager->getRepository(User::class)->findOneBy([
            'email' => $data->getEmail()
        ]);

        // Si un utilisateur est trouvé, lier le contact à cet utilisateur
        if ($user !== null) {
            $data->setUser($user);
        }

        // Persister le contact
        $this->entityManager->persist($data);
        $this->entityManager->flush();

        return $data;
    }
}
