import { proxyGet } from '~/utils/fetch';

export const login = () => proxyGet('/login');
