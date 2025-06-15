import React from 'react';
import { useLocation } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

/**
 * v6 replacement for SecureRoute (v5).
 * If the user isn't authenticated we kick off the redirect
 * and render nothing. While we’re waiting for authState,
 * we show a placeholder.
 */
const RequireAuth = ({ children, loadingFallback = <p>Loading…</p> }) => {
  const { oktaAuth, authState } = useOktaAuth();
  const location = useLocation();

  if (!authState) return loadingFallback;                 // still loading sdk state
  if (!authState.isAuthenticated) {
    oktaAuth.signInWithRedirect({ originalUri: location.pathname });
    return null;                                          // nothing until redirect happens
  }
  return children;
};

export default RequireAuth;