import Loadable from 'react-loadable';
import { Route, Switch } from 'react-router-dom';
import AuthRoute from '../../components/AuthRoute';
import Loader from '../../components/Loader';

const Login = Loadable({ loader: () => import('../pub/Login'), loading: Loader });
const Index = Loadable({ loader: () => import('../auth/Index'), loading: Loader });
const UserPage = Loadable({ loader: () => import('../auth/user/User'), loading: Loader });
const Data1Page = Loadable({ loader: () => import('../auth/system/data/Data1'), loading: Loader });
const Setting = Loadable({ loader: () => import('../auth/system/Setting'), loading: Loader });

const RssSite = Loadable({ loader: () => import('../auth/rss/Site'), loading: Loader });
const RssBlog = Loadable({ loader: () => import('../auth/rss/Blog'), loading: Loader });

const RouteMap = () => (
  <Switch>
    <Route path={'/login'} component={Login} />
    <AuthRoute exact path={'/'} component={Index} />
    <AuthRoute exact path={'/index'} component={Index} />
    <AuthRoute exact path={'/user'} component={UserPage} />
    <AuthRoute exact path={'/user/onWork'} component={UserPage} />
    <AuthRoute exact path={'/data/data1'} component={Data1Page} />
    <AuthRoute exact path={'/setting'} component={Setting} />
    <AuthRoute exact path={'/rss/site'} component={RssSite} />
    <AuthRoute exact path={'/rss/blog'} component={RssBlog} />
  </Switch>
)

export default RouteMap;