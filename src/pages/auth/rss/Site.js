import { DeleteOutlined, DisconnectOutlined, GlobalOutlined, HomeOutlined, LoadingOutlined, UserOutlined, WifiOutlined } from '@ant-design/icons';
import { Button, Image, Modal, Space, Table, Tooltip } from 'antd';
import dayjs from 'dayjs';
import React, { Component } from 'react';
import { deleteSiteReq, fetchRssSitesReq, subScribeSiteReq, unSubScribeSiteReq } from '../../../api/Rss';
import DefaultFavicon from '../../../assets/favicon.ico';
import SearchForm from '../../../components/SearchForm';
import Page from '../../base/Page';
import PullStatusTag from './components/PullStatusTag';

const breadcrumb = [
  {
    path: '/rss/site',
    breadcrumbName: 'RSS源'
  }
]

const SubScribeBtn = ({ site, selected, loading, onSubscribe, onCancelSubscibe }) => {
  if (loading && site.id === selected) {
    return <Button size="small" type="text" danger icon={<LoadingOutlined />} disabled>Loading...</Button>
  }
  return site.pullOn
    ? <Button size="small" type="text" danger icon={<DisconnectOutlined />} onClick={() => { onCancelSubscibe(site) }}>取消订阅</Button>
    : <Button size="small" type="text" icon={<WifiOutlined />} onClick={() => { onSubscribe(site) }}>恢复订阅</Button>
}

const DeleteBtn = ({ site, selected, loading, onDelete }) => {
  if (loading && site.id === selected) {
    return <Button size="small" type="text" danger icon={<LoadingOutlined />} disabled>Loading...</Button>
  }
  return <Button size="small" type="text" danger icon={<DeleteOutlined />} onClick={() => { onDelete(site) }}>删除</Button>
}

class RssSitePage extends Component {

  columns = [
    {
      title: '订阅源',
      dataIndex: 'siteTitle',
      key: 'siteTitle',
      width: 360,
      render: (siteTitle, site) =>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image preview={false} width={18} height={18} src={site.faviconUrl} fallback={DefaultFavicon} />
          &nbsp;
          <span>{siteTitle}</span>
        </div>,
    },
    {
      title: '链接',
      dataIndex: 'homeUrl',
      key: 'homeUrl',
      width: 90,
      render: (homeUrl, site) =>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <a target="_blank" href={homeUrl}> <Tooltip title="网站主页"><HomeOutlined /></Tooltip></a>
          &nbsp;
          <a target="_blank" href={site.aboutmeUrl}> <Tooltip title="关于网站"><UserOutlined /></Tooltip></a>
          &nbsp;
          <a target="_blank" href={site.rssUrl}> <Tooltip title="RSS"><GlobalOutlined /></Tooltip></a>
        </div>,
    },
    {
      title: '内容数量',
      dataIndex: 'updateCount',
      key: 'updateCount',
      width: 80,
      render: (updateCount) => `${updateCount || 0}篇`
    },
    {
      title: '最近更新时间',
      dataIndex: 'latestUpdateTime',
      key: 'latestUpdateTime',
      width: 120,
      render: (latestUpdateTime) => <span>{latestUpdateTime ? dayjs(latestUpdateTime).fromNow() : '无更新'}</span>
    },
    {
      title: '最近一次拉取',
      dataIndex: 'latestPullSiteJobId',
      key: 'latestPullSiteJobId',
      width: 200,
      render: (latestPullSiteJobId, site) =>
        <div>
          <PullStatusTag status={site.latestPullStatus} />
          {latestPullSiteJobId && <a target="_blank" href="#"> <Tooltip title={dayjs(site.latestPullTime).fromNow()}>#{latestPullSiteJobId}</Tooltip></a>}
          &nbsp;&nbsp;
          <a onClick={this.pullSite}>
            <Tooltip title="重新拉取">
              <WifiOutlined />
            </Tooltip>
          </a>
        </div>
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '操作',
      dataIndex: 'lastestPullTime',
      key: 'action',
      width: 220,
      render: (text, site) => (
        <Space size="middle">
          <SubScribeBtn
            key={site.id}
            site={site}
            selected={this.state.subscribeSiteId}
            loading={this.state.subscribeBtnLoading}
            onSubscribe={this.handleSubscribe}
            onCancelSubscibe={this.handleCancelSubscribe}
          />
          <DeleteBtn
            key={site.id}
            site={site}
            selected={this.state.deleteSiteId}
            loading={this.state.deleteBtnLoading}
            onDelete={this.handleDelete}
          />
        </Space>
      ),
    },
  ];

  state = {
    tableData: [],
    subscribeSiteId: null,
    subscribeBtnLoading: false,
    deleteSiteId: null,
    deleteBtnLoading: false,
    condition: {
      pullOn: 1
    }
  }

  pullSite = () => { }

  handleSubscribe = (site) => {
    this.setState({ subscribeBtnLoading: true, subscribeSiteId: site.id })
    subScribeSiteReq(site.id)
      .then(res => {
        this.table.refreshTableData((tableData, set) => {
          tableData.filter(s => s.id === res)[0].pullOn = 1;
          set([...tableData]);
        })
      })
      .finally(() => {
        this.setState({ subscribeBtnLoading: false })
      })
  }

  handleCancelSubscribe = (site) => {
    this.setState({ subscribeBtnLoading: true, subscribeSiteId: site.id })
    unSubScribeSiteReq(site.id)
      .then(res => {
        this.table.refreshTableData((tableData, set) => {
          tableData.filter(s => s.id === res)[0].pullOn = 0;
          set([...tableData]);
        })
      })
      .finally(() => {
        this.setState({ subscribeBtnLoading: false })
      })
  }

  handleDelete = (site) => {
    Modal.confirm({
      title: '确定删除订阅?',
      icon: <DeleteOutlined />,
      content: `[${site.siteTitle}]`,
      okType: 'danger',
      okText: '删除订阅',
      cancelText: '取消',
      onOk: () => {
        this.setState({ deleteBtnLoading: true, deleteSiteId: site.id })
        deleteSiteReq(site.id)
          .then(res => {
            this.table.refreshTableData((tableData, set) => {
              const sites = tableData.filter(s => s.id !== res);
              set(sites);
            })
          })
          .finally(() => {
            this.setState({ deleteBtnLoading: false })
          })
      }
    })
  }

  bindTable = (table) => {
    this.table = table;
  }

  handleSearch = (condition) => {
    this.setState({ condition }, () => {
      this.fetchRssSites()
    })
  }

  fetchRssSites = () => {
    this.setState({ tableLoading: true })
    fetchRssSitesReq({
      ...this.state.condition, pageNum: 1, pageSize: 50
    })
      .then(res => {
        this.setState({ tableData: res.records })
      }).finally(() => {
        this.setState({ tableLoading: false })
      })
  }


  render() {
    return (
      <div className="rss-site-page page">
        <SearchForm fields={
          [
            { name: 'title', label: '标题' },
            { name: 'pullOn', label: '是否订阅', type: 'select', defaultValue: 1, dataSet: [{ value: 1, label: '是' }, { value: 0, label: '否' }] }
          ]
        } loading={tableLoading} onSearch={this.handleSearch} />
        <div style={{ height: '1rem' }} />
        <Table loading={tableLoading} size="small" bordered columns={this.columns} dataSource={this.state.tableData} pagination={false} />
      </div>
    )
  }
}

export default Page(RssSitePage, breadcrumb)