import React, { Component } from 'react'
import Page from '../../base/Page'

const breadcrumb = [
  {
    breadcrumbName: '员工管理'
  },
  {
    path: '/onWork',
    breadcrumbName: '在职员工'
  }
]

class UserPage extends Component {
  render() {
    return (
      <div className="user-page page">
        用户
      </div>
    )
  }
}

export default Page(UserPage, breadcrumb)