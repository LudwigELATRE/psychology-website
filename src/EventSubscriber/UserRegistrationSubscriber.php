<?php

namespace App\EventSubscriber;

use App\Entity\Contact;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsEntityListener;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Events;

/**
 * Listener déclenché après la création d'un User.
 * Lie automatiquement les contacts existants qui ont le même email.
 */
#[AsEntityListener(event: Events::postPersist, method: 'postPersist', entity: User::class)]
class UserRegistrationSubscriber
{
    public function __construct(
        private EntityManagerInterface $entityManager,
    ) {
    }

    public function postPersist(User $user): void
    {
        // Chercher tous les contacts avec le même email qui ne sont pas encore liés
        $contacts = $this->entityManager->getRepository(Contact::class)->findBy([
            'email' => $user->getEmail(),
            'user' => null,
        ]);

        if (empty($contacts)) {
            return;
        }

        // Lier chaque contact trouvé au nouvel utilisateur
        foreach ($contacts as $contact) {
            $contact->setUser($user);
        }

        $this->entityManager->flush();
    }
}
