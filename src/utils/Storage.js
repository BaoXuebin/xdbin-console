import Config from '../config/Config';

const error = '浏览器不支持 localStorage';

export const LocalStorageKey = {
  TOKEN: 'TOKEN',
  COLLAPSED: 'COLLAPSED',
  FBOX_LIST: 'FBOX_LIST',
  USER: 'USER',
  COMPANY: 'COMPANY',
  HISTORY_SEARCH_ROUTE: 'HISTORY_SEARCH_ROUTE',
  MOBILE_SEARCH: 'MOBILE_SEARCH',
  CACHE_FORM_DATA: 'CACHE_FORM_DATA',
};

export const put = (k, v) => {
  if (localStorage) {
    localStorage.setItem(`${Config.storagePrefix}_${k}`, v);
  } else {
    console.error(error);
  }
};

export const get = k => {
  if (localStorage) {
    return localStorage.getItem(`${Config.storagePrefix}_${k}`);
  }
  console.error(error);
  return null;
};

export const remove = k => {
  if (localStorage) {
    localStorage.removeItem(`${Config.storagePrefix}_${k}`);
  } else {
    console.error(error);
  }
};

export const removeAll = () => {
  if (localStorage) {
    localStorage.clear();
  } else {
    console.error(error);
  }
};