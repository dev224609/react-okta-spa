# REACT-OKTA-SPA

Sample app to test the Okta SSO integration with SPA


## Releases

### v1.0.0
* Initial build

--

### v2.0.0
* Redirects to External Logout URL to enabled chained Logout.
    * Environment variable _'REACT_APP_CHAINED_LOGOUT'_ should be set as true and define the External logout url for the parameter _'REACT_APP_postLogoutRedirectUri'_