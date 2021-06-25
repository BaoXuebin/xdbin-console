import { Layout, Menu } from 'antd';
import React, { Component } from 'react';
import RssSideMenu from '../pages/auth/rss/RssSideMenu';
import './styles/PageLayout.less';

const { Header, Sider, Footer } = Layout;

class PageLayout extends Component {

  state = {
    collapsed: true,
    selectedMenu: 'user', // 默认选中
    aniClassName: ''
  };

  onCollapse = collapsed => {
    this.setState({ collapsed, aniClassName: collapsed ? 'left-extend' : 'right-extend' });
  };

  onChangeMenu = m => {
    this.setState({ selectedMenu: m.key })
  }

  render() {
    const { collapsed, selectedMenu, aniClassName } = this.state;
    return (
      <Layout className="components-layout">
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[selectedMenu]} onSelect={this.onChangeMenu}>
            <Menu.Item key="rss">RSS订阅</Menu.Item>
          </Menu>
        </Header>
        <Layout className="layout-content">
          <Sider theme="dark" className="side" collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
            {selectedMenu === 'rss' && <RssSideMenu theme="dark" />}
          </Sider>
          <Layout className={`content ${aniClassName}`} style={{ marginLeft: collapsed ? 80 : 200 }}>
            {this.props.children}
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default PageLayout;