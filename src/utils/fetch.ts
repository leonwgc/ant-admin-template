import axios, { AxiosResponse, AxiosError } from 'axios';

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

export const fetchProxyFadada = axios.create({
  baseURL: '/fadadaProxyApi',
});

// fetch docusign cors call api
const fetchDocuSign = axios.create({
  baseURL: 'https://demo.docusign.net/restapi',
});

const onSuccess = (response: AxiosResponse): AxiosResponse => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
};

const onFailure = (error: AxiosError): Promise<never> => {
  if (error.response) {
    // 请求已发送，服务器返回了非 2xx 状态码
    // eslint-disable-next-line no-console
    console.error('请求失败，服务器响应状态码:', error.response.status);
    // eslint-disable-next-line no-console
    console.error('错误响应数据:', error.response.data);
  } else if (error.request) {
    // 请求已发送，但没有收到响应
    // eslint-disable-next-line no-console
    console.error('请求已发送，但没有收到响应');
  } else {
    // 在设置请求时发生错误
    // eslint-disable-next-line no-console
    console.error('设置请求时发生错误:', error.message);
  }
  return Promise.reject(error);
};

fetch.interceptors.response.use(onSuccess, onFailure);
fetchProxy.interceptors.response.use(onSuccess, onFailure);
fetchDocuSign.interceptors.response.use(onSuccess, onFailure);

export const get = fetch.get.bind(fetch);
export const post = fetch.post.bind(fetch);
export const put = fetch.put.bind(fetch);
export const del = fetch.delete.bind(fetch);

export const proxyGet = fetchProxy.get.bind(fetchProxy);
export const proxyPost = fetchProxy.post.bind(fetchProxy);
export const proxyPut = fetchProxy.put.bind(fetchProxy);
export const proxyDel = fetchProxy.delete.bind(fetchProxy);

export const dsGet = fetchDocuSign.get.bind(fetchDocuSign);
export const dsPost = fetchDocuSign.post.bind(fetchDocuSign);
export const dsPut = fetchDocuSign.put.bind(fetchDocuSign);
export const dsDel = fetchDocuSign.delete.bind(fetchDocuSign);
