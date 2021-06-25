import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const defaultRoutes = [
  {
    path: '',
    breadcrumbName: '主页',
  }
];

function itemRender(route, params, routes, paths) {
  const last = routes.indexOf(route) === routes.length - 1;
  return (last || !route.path) ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={route.path}>{route.breadcrumbName}</Link>
  );
}

const PageBreadcrumb = ({ routes = [] }) => (
  <Breadcrumb style={{ margin: '16px 0' }} itemRender={itemRender} routes={[...defaultRoutes, ...routes]} />
)

export default PageBreadcrumb