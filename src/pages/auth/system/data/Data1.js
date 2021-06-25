import React, { Component } from 'react'
import Page from '../../../base/Page'

const breadcrumb = [
  {
    path: '/data',
    breadcrumbName: '数据维护'
  },
  {
    path: '/data/data1',
    breadcrumbName: '数据项1'
  },
]

class Data1Page extends Component {
  render() {
    return (
      <div className="data1-page page">
        数据项1的维护页面
      </div>
    )
  }
}

export default Page(Data1Page, breadcrumb)