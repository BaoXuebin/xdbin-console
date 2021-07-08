import dayjs from 'dayjs'
import { Typography } from 'antd';
import React, { Component, Fragment } from 'react'
import { fetchRssBlogsReq } from '../../../api/Rss'
import FetchTable from '../../../components/FetchTable'
import Page from '../../base/Page'

const breadcrumb = [
  {
    path: '/rss/job',
    breadcrumbName: '定时任务'
  }
]

const { Title } = Typography;

class RssJobPage extends Component {

  columns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      width: 60,
    },
    {
      title: 'rss来源',
      dataIndex: 'rssSiteTitle',
      key: 'rssSiteTitle',
      width: 200,
      render: (rssSiteTitle, blog) => <a href={blog.rssSiteAboutUrl} target="_blank">@{rssSiteTitle}</a>
    },
    {
      title: '文章标题',
      dataIndex: 'title',
      key: 'title',
      render: (title, blog) =>
        <Fragment>
          {
            blog.clickNum > 0 && <span style={{ fontSize: 12, color: 'gray' }}>[{blog.clickNum}次点击]&nbsp;</span>
          }
          <a href={blog.blogUrl} target="_blank">{title}</a>
        </Fragment>
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
      width: 120
    },
    {
      title: '发布时间',
      dataIndex: 'publishTime',
      key: 'publishTime',
      width: 120,
      render: (publishTime) => <span>{publishTime ? dayjs(publishTime).fromNow() : ''}</span>
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 260,
    },
  ]

  render() {
    return (
      <Fragment>
        <div className="top" style={{ marginBottom: '1rem' }}>
          <Title>h1. Ant Design</Title>
        </div>
        <div className="rss-rss-page page">
          <FetchTable
            req={fetchRssBlogsReq}
            form={[
              { name: 'title', label: '标题' }
            ]}
            columns={this.columns}
          />
        </div>
      </Fragment>
    )
  }
}

export default Page(RssJobPage, breadcrumb)