import axios from 'axios';

const fetch = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

export const get = fetch.get;
export const post = fetch.post;
export const put = fetch.put;
export const del = fetch.delete;
