import fetch from 'xhr-fetch-lib';

// 获取文件流
export const fetchBlob = (url, method = 'get', data = null) => {
  return fetch({
    url,
    method,
    data,
    xhrSetting: { responseType: 'blob' },
    responseParser: (xhr) => xhr.response,
  });
};

// 文件流下载
export const download = (blob, fileName) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
};

// 文件流获取并下载
export const fetchAndDownload = (api, fileName, method = 'get', data = null, headers = null) => {
  return fetchBlob(api, method, data).then((blob) => {
    download(blob, fileName);
  });
};
