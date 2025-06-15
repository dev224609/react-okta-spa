import React from 'react';
import { Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

const NavBar = () => {
  const { oktaAuth, authState } = useOktaAuth();

  const login = () => oktaAuth.signInWithRedirect();
  const logout = () =>
    oktaAuth.signOut({ postLogoutRedirectUri: window.location.origin });

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>React-Okta-SPA</Link>

      <div style={styles.right}>
        {authState?.isAuthenticated ? (
          <>
            <Link to="/profile" style={styles.link}>Profile</Link>
            <button onClick={logout} style={styles.button}>Logout</button>
          </>
        ) : (
          <button onClick={login} style={styles.button}>Login</button>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav:    { display:'flex', justifyContent:'space-between', padding:'0.75rem 1rem', background:'#282c34', color:'#fff' },
  brand:  { color:'#61dafb', textDecoration:'none', fontSize:'1.2rem' },
  right:  { display:'flex', gap:'1rem', alignItems:'center' },
  link:   { color:'#fff', textDecoration:'none' },
  button: { background:'#61dafb', border:'none', padding:'0.4rem 0.8rem', cursor:'pointer', borderRadius:'4px' },
};

export default NavBar;