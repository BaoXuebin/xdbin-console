import { message, Modal } from 'antd';
import _fetch from 'isomorphic-fetch';
import { get, LocalStorageKey, put } from './Storage';

export const href = (url) => {
  if (window) {
    window.location.href = `${url}`;
  }
};

export const reload = () => {
  if (window) {
    window.location.reload();
  }
};

export const redirectLoginPage = (r) => {
  href(`/login?r=${r || ''}`);
};

export const flatCondition = (condition) => {
  let result = '';
  if (!condition) return result;
  for (let key in condition) {
    if (result === '') {
      if (condition[key] !== null && condition[key] !== undefined) {
        result += `${key}=${condition[key]}`;
      }
    } else {
      if (condition[key] !== null && condition[key] !== undefined) {
        result += `&${key}=${condition[key]}`;
      }
    }
  }
  return result;
};

export const fetch = (url, { method, headers, body, type, errMap } = {}) => {
  // 默认 header
  let _defaultHeaders = null;
  _defaultHeaders = {
    Authorization: `Bearer ${get(LocalStorageKey.TOKEN)}`,
  };

  if (type !== 'file') {
    _defaultHeaders['Content-Type'] = 'application/json';
  }

  let checkStatus = (response) => {
    return response;
  }

  return new Promise((resolve, reject) => {
    const fetchReq = _fetch(url, {
      credentials: 'include', // 添加 cookie
      method: method || 'GET',
      headers: Object.assign({}, _defaultHeaders, headers),
      body: type === 'file' ? body : JSON.stringify(body)
    });

    fetchReq.then(checkStatus).then(res => res.json())
      .then(result => {
        const { code, currentToken } = result;
        // 缓存最新的 token
        if (currentToken) {
          put(LocalStorageKey.TOKEN, currentToken);
        }
        if (code === 200) {
          resolve(result.data);
        } else if (code !== 200) {
          if (code === 401) {
            Modal.error({
              title: '用户身份已过期，请尝试重新登录',
              onOk: () => { Modal.destroyAll(); redirectLoginPage(); }
            });
          } else if (errMap && errMap[code]) {
            message.error(errMap[code])
          } else {
            message.error('请求失败，请刷新页面重试');
          }
          reject(result);
        }
      })
      .catch((e) => { message.error('请求失败，请刷新页面重试'); reject(e); });
  });
};