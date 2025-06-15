import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

/* Every page gets the same NavBar. <Outlet> renders the child route. */
const Layout = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

export default Layout;