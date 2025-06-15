import React, { useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { jwtDecode } from 'jwt-decode';

const tokenClaims = (token) => {
  if (!token) return {};
  try { return jwtDecode(token.idToken ?? token.accessToken); } catch { return {}; }
};

const Profile = () => {
  const { authState } = useOktaAuth();

  const idClaims     = useMemo(() => tokenClaims(authState?.idToken),        [authState]);
  const accessClaims = useMemo(() => tokenClaims(authState?.accessToken),    [authState]);

  if (!authState || !authState.isAuthenticated) return <p>Loading...</p>;

  return (
    <div style={{ padding:'2rem' }}>
      <h2>ID Token Claims</h2>
      <ClaimsTable claims={idClaims} />

      <h2 style={{ marginTop:'2rem' }}>Access Token Claims</h2>
      {Object.keys(accessClaims).length
        ? <ClaimsTable claims={accessClaims} />
        : <p>No JWT access token (add API scopes if required).</p>}
    </div>
  );
};

const ClaimsTable = ({ claims }) => (
  <table style={tbl}>
    <tbody>
      {Object.entries(claims).map(([k, v]) => (
        <tr key={k}>
          <th style={cell}>{k}</th>
          <td style={cell}><code>{JSON.stringify(v)}</code></td>
        </tr>
      ))}
    </tbody>
  </table>
);

const tbl  = { borderCollapse:'collapse', width:'100%' };
const cell = { border:'1px solid #ccc', padding:'0.4rem', textAlign:'left' };

export default Profile;