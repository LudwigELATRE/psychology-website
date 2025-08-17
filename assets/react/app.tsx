import React from 'react';
import { createRoot } from 'react-dom/client';
import Index from './pages/Index';
import { AuthProvider } from './contexts/AuthContext';
import './styles/globals.css';

const container = document.getElementById('react-root');

if (container) {
    const root = createRoot(container);
    root.render(
        <AuthProvider>
            <Index />
        </AuthProvider>
    );
} else {
    console.error('Element with id "react-root" not found');
}