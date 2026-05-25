import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';
import '@/shared/styles/globals.scss';

const ROOT_CONTAINER = document.getElementById('root');

if (!ROOT_CONTAINER) {
  throw new Error('Root container was not found');
}

createRoot(ROOT_CONTAINER).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
