import { Layout } from 'antd';
import React, { Component, Fragment } from 'react';
import PageBreadcrumb from '../../components/PageBreadcrumb';
import AuthContext from '../../context/AuthContext';

const { Content } = Layout;

const Page = (ChildComponent, breadcrumb) => class extends Component {

  user = this.context.user

  render() {
    return (
      <Fragment>
        {
          this.user && <PageBreadcrumb routes={breadcrumb || []} />
        }
        <Content
          className="page-content"
        >
          <ChildComponent
            user={this.user}
            {...this.props}
          />
        </Content>
      </Fragment>
    )
  }
}

Page.contextType = AuthContext
export default Page