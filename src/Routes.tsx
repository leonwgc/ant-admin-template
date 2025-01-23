import React from 'react';
import { Route, Router } from 'react-router';
import AdminLayout from './Layout';

export default () => (
  <Router>
    <Route path="admin" element={<AdminLayout />} />
  </Router>
);
