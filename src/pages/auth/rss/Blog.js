import { Table } from 'antd'
import dayjs from 'dayjs'
import React, { Component, Fragment } from 'react'
import { fetchRssBlogsReq } from '../../../api/Rss'
import SearchForm from '../../../components/SearchForm'
import Page from '../../base/Page'

const breadcrumb = [
  {
    path: '/rss/blog',
    breadcrumbName: 'RSS博客'
  }
]

class RssBlogPage extends Component {

  state = {
    tableLoading: false,
    tableData: [],
    condition: {}
  }

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
      render: (publishTime) => <span>{dayjs(publishTime).fromNow()}</span>
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 260,
    },
  ]

  componentDidMount() {
    this.fetchRssBlogs()
  }

  handleSearch = () => {
    this.setState({ condition: {} }, () => {
      this.fetchRssBlogs()
    })
  }

  fetchRssBlogs = () => {
    this.setState({ tableLoading: true })
    fetchRssBlogsReq({
      ...this.state.condition, pageNum: 1, pageSize: 100
    })
      .then(res => {
        this.setState({ tableData: res.records })
      }).finally(() => {
        this.setState({ tableLoading: false })
      })
  }

  render() {
    const { tableLoading, tableData } = this.state
    return (
      <div className="rss-blog-page page">
        <SearchForm fields={
          [
            { name: 'title', label: '标题' }
          ]
        } loading={tableLoading} onSearch={this.handleSearch} />
        <div style={{ height: '1rem' }} />
        <Table loading={tableLoading} size="small" bordered columns={this.columns} dataSource={tableData} pagination={false} />
      </div>
    )
  }
}

export default Page(RssBlogPage, breadcrumb)