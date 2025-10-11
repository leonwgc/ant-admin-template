import React, { useEffect } from 'react';

const EditUser = () => {
  useEffect(() => {
    console.log('edit user ');
  }, []);

  return (
    <div>
      <h1>Edit User</h1>
      <p>This is the Eidt User page.</p>
    </div>
  );
};

export default EditUser;
