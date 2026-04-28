import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app';
import './shared/styles/globals.scss';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container was not found');
}

createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
