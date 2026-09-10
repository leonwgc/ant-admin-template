/**
 * @file services/auth.ts
 * @author leon.wang
 */
import type { UserInfo } from '~/store';

export interface LoginParams {
  account: string;
  password: string;
  remember: boolean;
}

const MOCK_ACCOUNT = 'admin';
const MOCK_PASSWORD = 'admin';
const MOCK_AUTH_KEY = 'mock-auth-user';

const MOCK_USER: UserInfo = {
  id: 'mock-admin',
  name: 'Administrator',
  email: 'admin@example.com',
  roles: ['admin'],
};

interface MockAuthError {
  response: {
    status: number;
    data: {
      code: number;
      msg: string;
    };
  };
}

const createInvalidCredentialsError = (): MockAuthError => ({
  response: {
    status: 401,
    data: {
      code: 40001,
      msg: 'The account or password is incorrect.',
    },
  },
});

export const login = async (params: LoginParams): Promise<UserInfo> => {
  if (
    params.account !== MOCK_ACCOUNT ||
    params.password !== MOCK_PASSWORD
  ) {
    throw createInvalidCredentialsError();
  }

  const serializedUser = JSON.stringify(MOCK_USER);
  if (params.remember) {
    localStorage.setItem(MOCK_AUTH_KEY, serializedUser);
    sessionStorage.removeItem(MOCK_AUTH_KEY);
  } else {
    sessionStorage.setItem(MOCK_AUTH_KEY, serializedUser);
    localStorage.removeItem(MOCK_AUTH_KEY);
  }

  return MOCK_USER;
};

export const logout = async (): Promise<void> => {
  localStorage.removeItem(MOCK_AUTH_KEY);
  sessionStorage.removeItem(MOCK_AUTH_KEY);
};

export const getCurrentUser = async (): Promise<UserInfo> => {
  const serializedUser =
    localStorage.getItem(MOCK_AUTH_KEY) || sessionStorage.getItem(MOCK_AUTH_KEY);

  if (!serializedUser) {
    throw createInvalidCredentialsError();
  }

  return JSON.parse(serializedUser) as UserInfo;
};
