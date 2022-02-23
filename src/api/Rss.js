import { fetch, flatCondition } from "../utils/Req";

export const fetchRssSitesReq = (condition) => fetch(`/api/v1/rss/sites?${flatCondition(condition)}`);
export const fetchRssSiteJobReq = (siteJobId) => fetch(`/api/v1/rss/sites/jobs/${siteJobId}`);
export const subScribeSiteReq = siteId => fetch(`/api/v1/rss/sites/${siteId}/subscribe`, { method: 'PUT' });
export const unSubScribeSiteReq = siteId => fetch(`/api/v1/rss/sites/${siteId}/unSubscribe`, { method: 'PUT' });
export const deleteSiteReq = siteId => fetch(`/api/v1/rss/sites/${siteId}`, { method: 'DELETE' });

export const fetchRssPullJobsReq = (condition) => fetch(`/api/v1/rss/jobs?${flatCondition(condition)}`);

export const fetchRssBlogsReq = (condition) => fetch(`/api/v1/rss/blogs?${flatCondition(condition)}`);