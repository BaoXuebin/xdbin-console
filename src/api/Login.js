import { fetch } from "../utils/Req";

export const loginReq = ({ account, password, lgt }) =>
  fetch(`/api/v1/login`, { method: 'POST', body: { account, password, lgt, pft: 'CONSOLE' }, errMap: { 1010: '用户不存在', 1011: '用户名密码不匹配' } });