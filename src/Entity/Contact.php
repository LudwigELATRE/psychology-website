<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\Repository\ContactRepository;
use App\State\ContactStateProcessor;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: ContactRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(security: "is_granted('ROLE_ADMIN')"),
        new Get(security: "is_granted('ROLE_ADMIN')"),
        new Post(processor: ContactStateProcessor::class)
    ],
    normalizationContext: ['groups' => ['contact:read']],
    denormalizationContext: ['groups' => ['contact:write']]
)]
class Contact
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['contact:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    #[Assert\NotBlank]
    #[Assert\Length(max: 100)]
    #[Groups(['contact:read', 'contact:write'])]
    private ?string $firstName = null;

    #[ORM\Column(length: 100)]
    #[Assert\NotBlank]
    #[Assert\Length(max: 100)]
    #[Groups(['contact:read', 'contact:write'])]
    private ?string $lastName = null;

    #[ORM\Column(length: 180)]
    #[Assert\NotBlank]
    #[Assert\Email]
    #[Groups(['contact:read', 'contact:write'])]
    private ?string $email = null;

    #[ORM\Column(length: 20, nullable: true)]
    #[Groups(['contact:read', 'contact:write'])]
    private ?string $phone = null;

    #[ORM\Column(length: 100)]
    #[Assert\NotBlank]
    #[Assert\Choice(choices: [
        'Thérapie individuelle',
        'Thérapie de couple', 
        'Psychologie de l\'enfant',
        'Accompagnement professionnel',
        'Évaluation psychologique',
        'Autre'
    ])]
    #[Groups(['contact:read', 'contact:write'])]
    private ?string $consultationType = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['contact:read', 'contact:write'])]
    private ?string $message = null;

    #[ORM\Column]
    #[Assert\IsTrue(message: "Vous devez accepter la confidentialité")]
    #[Groups(['contact:read', 'contact:write'])]
    private ?bool $confidentialityAccepted = null;

    #[ORM\Column]
    #[Groups(['contact:read'])]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column]
    #[Groups(['contact:read'])]
    private bool $processed = false;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'contacts')]
    #[ORM\JoinColumn(nullable: true)]
    #[Groups(['contact:read'])]
    private ?User $user = null;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
        $this->confidentialityAccepted = false;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): static
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): static
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): static
    {
        $this->phone = $phone;

        return $this;
    }

    public function getConsultationType(): ?string
    {
        return $this->consultationType;
    }

    public function setConsultationType(string $consultationType): static
    {
        $this->consultationType = $consultationType;

        return $this;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(?string $message): static
    {
        $this->message = $message;

        return $this;
    }

    public function isConfidentialityAccepted(): ?bool
    {
        return $this->confidentialityAccepted;
    }

    public function setConfidentialityAccepted(bool $confidentialityAccepted): static
    {
        $this->confidentialityAccepted = $confidentialityAccepted;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function isProcessed(): bool
    {
        return $this->processed;
    }

    public function setProcessed(bool $processed): static
    {
        $this->processed = $processed;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }
}