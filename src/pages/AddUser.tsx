import React, { useEffect } from 'react';

const AddUser = () => {
  useEffect(() => {
    console.log('add user ');
  }, []);

  return (
    <div>
      <h1>Add User</h1>
      <p>This is the Add User page.</p>
    </div>
  );
};

export default AddUser;
