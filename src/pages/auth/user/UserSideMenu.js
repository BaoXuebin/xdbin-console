import { UserOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const UserSideMenu = ({ theme }) => (
  <Menu
    mode="inline"
    theme={theme}
    defaultSelectedKeys={['1']}
    style={{ height: '100%', borderRight: 0 }}
  >
    <Menu.Item key="user" icon={<UserOutlined />}>
      <Link to="/user/onWork">在职员工</Link>
    </Menu.Item>
  </Menu >
)

export default UserSideMenu