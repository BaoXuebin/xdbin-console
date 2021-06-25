import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { redirectLoginPage } from '../utils/Req';
import Loader from './Loader';

class AuthRoute extends Component {

  isLogin = Boolean(this.context.user)

  componentWillMount() {
    if (!this.isLogin) { // 用户不存在，直接跳转到登录页面
      redirectLoginPage();
    }
  }

  render() {
    const { component: ChildComponent, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          this.isLogin ? (
            <ChildComponent {...props} />
          ) : (
            <Loader />
          )
        }
      />
    );
  }
}

AuthRoute.contextType = AuthContext
export default AuthRoute