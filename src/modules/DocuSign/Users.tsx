import { useLocalStorageState, useRequest } from 'ahooks';
import React, { useCallback, useEffect } from 'react';
import { dsGet } from '~/utils/fetch';
import { Spin } from '@derbysoft/neat-design';
import type { Token } from './Login';

export default () => {
  const [users, setUsers] = React.useState([]);
  const [token] = useLocalStorageState<Token>('token', {
    listenStorageChange: true,
  });

  const getUsers = useCallback(
    (token) =>
      dsGet(`/v2.1/accounts/${token?.accountId}/users`, {
        headers: { Authorization: `Bearer ${token?.token}` },
      }),
    []
  );

  const { loading, run } = useRequest(getUsers, {
    manual: true,
    onSuccess: (res) => {
      setUsers(res.data.users || []);
    },
    onError(e, params) {
      console.log(e, params);
    },
  });

  useEffect(() => {
    if (token?.accountId) {
      run(token);
    }
  }, [token?.accountId]);

  return (
    <div>
      <h1>Users</h1>
      <div>
        {loading ? (
          <Spin />
        ) : (
          users.map((user, index) => (
            <div key={index}>{JSON.stringify(user, null, 2)}</div>
          ))
        )}
      </div>
    </div>
  );
};
