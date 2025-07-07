import { useOktaAuth } from '@okta/okta-react';

const Applogout = () => {
    const { oktaAuth } = useOktaAuth();
    oktaAuth.closeSession();
    oktaAuth.tokenManager.clear();
    oktaAuth.clearStorage();

    return ('/');

};
  export default Applogout;