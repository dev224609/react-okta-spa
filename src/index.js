import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Security, LoginCallback } from '@okta/okta-react';

import App from './App';
import { oktaAuth } from './oktaConfig';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Security
      oktaAuth={oktaAuth}
      restoreOriginalUri={async (_oktaAuth, originalUri) =>
        window.location.replace(originalUri || '/')
      }
    >
      <App />
    </Security>
  </BrowserRouter>
);