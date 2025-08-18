<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ReactController extends AbstractController
{
    #[Route('/app', name: 'react_app')]
    #[Route('/profile', name: 'react_profile')]
    #[Route('/appointments', name: 'react_appointments')]
    #[Route('/admin', name: 'react_admin')]
    public function index(): Response
    {
        return $this->render('react/index.html.twig');
    }
} 