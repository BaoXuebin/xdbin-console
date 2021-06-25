import { BookOutlined, WifiOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const RssSideMenu = ({ theme }) => (
  <Menu
    mode="inline"
    theme={theme}
    defaultSelectedKeys={['5']}
    style={{ height: '100%', borderRight: 0 }}
  >
    <Menu.Item key="rss-site" icon={<WifiOutlined />}><Link to="/rss/site">RSS源</Link></Menu.Item>
    <Menu.Item key="rss-blog" icon={<BookOutlined />}><Link to="/rss/blog">博客</Link></Menu.Item>
  </Menu>
)

export default RssSideMenu