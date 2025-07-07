import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginCallback } from '@okta/okta-react';

import Layout       from './components/Layout';
import RequireAuth  from './components/RequireAuth';
import Home         from './pages/Home';
import Profile      from './pages/Profile';
import Applogout    from './components/Applogout';


export default function App() {
  return (
    <Routes>
      {/* Top-level “/” route is now just the shared layout */}
      <Route path="/" element={<Layout />}>

        {/* → Default child when the URL is exactly "/" */}
        <Route index element={<Home />} />

        <Route path="/callback" element={<LoginCallback />} />

        {/* Protected page */}
        <Route
          path="profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />

        <Route path="/applogout" element={<Applogout />}></Route>

        {/* Catch-all → back to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}