import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'

import { OdinErrorContext } from '@dssg/odin-react';

const container = document.getElementById('root');
if (!container) throw new Error("Root container not found");

createRoot(container).render(
  <StrictMode>
      <OdinErrorContext>
        <App />
      </OdinErrorContext>
  </StrictMode>,
)