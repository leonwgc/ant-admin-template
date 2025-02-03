import axios from 'axios';

const fetch = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

const fetchDocuSign = axios.create({
  baseURL: '/dsapi',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const onSuccess = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  return Promise.reject(new Error(`请求失败，状态码: ${response.status}`));
};

const onFailure = (error) => {
  if (error.response) {
    // 请求已发送，服务器返回了非 2xx 状态码
    console.error('请求失败，服务器响应状态码:', error.response.status);
    console.error('错误响应数据:', error.response.data);
  } else if (error.request) {
    // 请求已发送，但没有收到响应
    console.error('请求已发送，但没有收到响应');
  } else {
    // 在设置请求时发生错误
    console.error('设置请求时发生错误:', error.message);
  }
  return Promise.reject(error);
};

fetch.interceptors.response.use(onSuccess, onFailure);
fetchDocuSign.interceptors.response.use(onSuccess, onFailure);

export const get = fetch.get;
export const post = fetch.post;
export const put = fetch.put;
export const del = fetch.delete;

export const dsGet = fetchDocuSign.get;
export const dsPost = fetchDocuSign.post;
export const dsPut = fetchDocuSign.put;
export const dsDel = fetchDocuSign.delete;
