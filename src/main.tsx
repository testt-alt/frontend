import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initializeSecurity } from './utils/security';
import { initializeCodeProtection } from './utils/codeProtection';

// Inicializar protecciones de seguridad
initializeSecurity();
initializeCodeProtection();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
