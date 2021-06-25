import React, { Component } from 'react'
import Page from '../../base/Page'

const breadcrumb = [
  {
    path: '/rss/blog',
    breadcrumbName: 'RSS博客'
  }
]

class RssBlogPage extends Component {
  render() {
    return (
      <div className="rss-blog-page page">
        Rss 内容
      </div>
    )
  }
}

export default Page(RssBlogPage, breadcrumb)