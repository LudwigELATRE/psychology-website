import React from 'react';
import { createRoot } from 'react-dom/client';
import Index from './pages/Index';
import './styles/globals.css';

const container = document.getElementById('react-root');

if (container) {
    const root = createRoot(container);
    root.render(<Index />);
} else {
    console.error('Element with id "react-root" not found');
}