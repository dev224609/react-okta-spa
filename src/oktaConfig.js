import { OktaAuth } from '@okta/okta-auth-js';

export const oktaAuth = new OktaAuth({
  issuer: `https://${process.env.REACT_APP_OKTA_DOMAIN}/oauth2/default`,
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  redirectUri: window.location.origin + '/callback',
  scopes: ['openid', 'profile', 'email'],          // add api scopes if you want a JWT access token
  pkce: true,                                      // Auth Code + PKCE
});