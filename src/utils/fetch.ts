import axios from 'axios';

// fetch normal api
const fetch = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// fetch docusign auth via proxy
const fetchProxy = axios.create({
  baseURL: '/proxyApi',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// fetch docusign cors call api
const fetchDocuSign = axios.create({
  baseURL: '/dsapi',
  headers: {
    'Content-Type': 'application/json',
  },
});

const onSuccess = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
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
fetchProxy.interceptors.response.use(onSuccess, onFailure);

export const get = fetch.get;
export const post = fetch.post;
export const put = fetch.put;
export const del = fetch.delete;

export const proxyGet = fetchProxy.get;
export const proxyPost = fetchProxy.post;
export const proxyPut = fetchProxy.put;
export const proxyDel = fetchProxy.delete;

export const dsGet = fetchDocuSign.get;
export const dsPost = fetchDocuSign.post;
export const dsPut = fetchDocuSign.put;
export const dsDel = fetchDocuSign.delete;
