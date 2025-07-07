import React from 'react';
import { Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

const NavBar = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const chained_logout = process.env.REACT_APP_CHAINED_LOGOUT;

  const login = () => oktaAuth.signInWithRedirect();
  const logout = async () => {
    try {
      if (chained_logout === "enabled") {
        const redirectTo = process.env.REACT_APP_postLogoutRedirectUri+"?id_token_hint="+oktaAuth.getIdToken()+"&post_logout_redirect_uri="+window.location.origin+"/applogout";
        window.location.replace(redirectTo);
        return null;
      }
      else {
        oktaAuth.signOut({ postLogoutRedirectUri: process.env.REACT_APP_postLogoutRedirectUri || window.location.origin+"/applogout" });
      }


     } catch (err) {
      console.error('Redirect failed', err);
    }
  };

    
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