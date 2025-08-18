import React from 'react';
import { createRoot } from 'react-dom/client';
import Index from './pages/Index';
import Profile from './pages/Profile';
import Appointments from './pages/Appointments';
import Admin from './pages/Admin';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/toaster';
import './styles/globals.css';

const App = () => {
    // Détecter la route actuelle
    const path = window.location.pathname;
    
    // Rendre la page correspondante
    switch (path) {
        case '/profile':
            return <Profile />;
        case '/appointments':
            return <Appointments />;
        case '/admin':
            return <Admin />;
        case '/app':
        default:
            return <Index />;
    }
};

const container = document.getElementById('react-root');

if (container) {
    const root = createRoot(container);
    root.render(
        <AuthProvider>
            <App />
            <Toaster />
        </AuthProvider>
    );
} else {
    console.error('Element with id "react-root" not found');
}