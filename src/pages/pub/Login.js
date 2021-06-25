import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import React, { Component } from 'react';
import { loginReq } from '../../api/Login';
import LogoImage from '../../assets/niu.png';
import AuthContext from '../../context/AuthContext';
import { LocalStorageKey, put } from '../../utils/Storage';
import Page from '../base/Page';
import './styles/Login.less';


class Login extends Component {

  state = {
    loading: false
  }

  onFinish = (values, loginCallback) => {
    const { mobile, password } = values;
    this.setState({ loading: true })
    loginReq({ account: mobile, password, lgt: 'MOBILE_PASSWORD' })
      .then(res => {
        const { userId, token } = res;
        put(LocalStorageKey.TOKEN, token)
        loginCallback({ userId })
        this.props.history.push('/')
      }).finally(() => {
        this.setState({ loading: false })
      })
  }

  render() {
    const { loading } = this.state
    return (
      <div className="login-page page">
        <div>
          <div className="logo-image">
            <img src={LogoImage} alt="logo" />
          </div>
          <div className="title">
            xdbin.com 控制台
          </div>
          <AuthContext.Consumer>
            {
              ({ user, login }) => (
                <Form
                  name="normal_login"
                  className="login-form"
                  size="large"
                  initialValues={{ remember: true }}
                  onFinish={values => this.onFinish(values, login)}
                >
                  <Form.Item
                    name="mobile"
                    rules={[{ required: true, message: '用户名不能为空' }]}
                  >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="手机号码" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: '密码不能为空' }]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="密码"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                      <Checkbox>记住密码</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                      <span>忘记密码？</span>
                    </a>
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" loading={loading} htmlType="submit" className="login-form-button">
                      <span>登录</span>
                    </Button>
                    <span>Or&nbsp;</span>
                    <a href="">还没账户，立即注册</a>
                  </Form.Item>
                </Form>
              )
            }
          </AuthContext.Consumer>
        </div>
      </div>
    )
  }
}

export default Page(Login)