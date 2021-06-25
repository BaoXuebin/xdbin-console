import { fetch, flatCondition } from "../utils/Req";

export const fetchRssSitesReq = (condition) =>
  fetch(`/api/v1/rss/sites?${flatCondition(condition)}`);

export const subScribeSiteReq = siteId => fetch(`/api/v1/rss/sites/${siteId}/subscribe`, { method: 'PUT' });
export const unSubScribeSiteReq = siteId => fetch(`/api/v1/rss/sites/${siteId}/unSubscribe`, { method: 'PUT' });
export const deleteSiteReq = siteId => fetch(`/api/v1/rss/sites/${siteId}`, { method: 'DELETE' });