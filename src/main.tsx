import React from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';
import './index.css';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const DISABLE_AUTH = import.meta.env.VITE_DISABLE_AUTH === 'true';

if (!DISABLE_AUTH && !PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key');
}

const AppWithAuth = DISABLE_AUTH ? (
  <App />
) : (
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <App />
  </ClerkProvider>
);

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {AppWithAuth}
  </React.StrictMode>
); 