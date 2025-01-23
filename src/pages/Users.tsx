import { Space } from 'antd';
import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router';

const Users = () => {
  useEffect(() => {
    console.log('users');
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <p>This is the Users page.</p>
      <Outlet />
      <Space>
        <Link to={'/app/users/add'}>Add User</Link>
        <Link to={'/app/users/edit'}>Edit User</Link>
      </Space>
    </div>
  );
};

export default Users;
