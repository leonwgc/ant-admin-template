import React from 'react';
import { Link } from 'react-router';

const Logs = () => {
  return (
    <div>
      <h1>Logs</h1>
      <p>This is the Logs page.</p>
      <Link to={'/app/logs/log'}>goto log</Link>
    </div>
  );
};

export default Logs;
