import React from 'react';
import RequireAuth from './RequireAuth';

const AdminPage = () => {
  return (
    <RequireAuth>
      <div className="admin-page-view">
        <h1>Admin</h1>
      </div>
    </RequireAuth>
  );
};

export default AdminPage;
