import { DatabaseOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

const SystemSideMenu = ({ theme }) => (
  <Menu
    mode="inline"
    theme={theme}
    defaultSelectedKeys={['5']}
    style={{ height: '100%', borderRight: 0 }}
  >
    <SubMenu key="data" icon={<DatabaseOutlined />} title="数据维护">
      <Menu.Item key="data1"><Link to="/data/data1">数据项1</Link></Menu.Item>
    </SubMenu>
    <Menu.Item key="setting" icon={<SettingOutlined />}><Link to="/setting">系统设置</Link></Menu.Item>
  </Menu>
)

export default SystemSideMenu