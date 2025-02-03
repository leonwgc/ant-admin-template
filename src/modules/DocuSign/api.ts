import { dsGet } from '~/utils/fetch';

export const login = () => dsGet('/login');
