import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ReduxProvider, TanstackQueryProvider } from '@common/providers';

import Router from '@routes';

import './styles/index.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ReduxProvider>
        <TanstackQueryProvider>
          <Router />
        </TanstackQueryProvider>
      </ReduxProvider>
    </BrowserRouter>
  </StrictMode>,
);
