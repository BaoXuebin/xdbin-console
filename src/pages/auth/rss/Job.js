import {
  CheckCircleOutlined, CloseCircleOutlined
} from '@ant-design/icons';
import { Tag, Typography } from 'antd';
import React, { Component, Fragment } from 'react';
import { fetchRssPullJobsReq } from '../../../api/Rss';
import FetchTable from '../../../components/FetchTable';
import Page from '../../base/Page';

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
      title: '任务批次号',
      dataIndex: 'batchCode',
      key: 'batchCode',
      width: 200,
    },
    {
      title: '任务执行状态',
      dataIndex: 'pullStatus',
      key: 'pullStatus',
      width: 120,
    },
    {
      title: '任务执行结果',
      dataIndex: 'okCount',
      key: 'okCount',
      width: 200,
      render: (okCount, record) => {
        return (
          <div>
            <Tag icon={<CheckCircleOutlined />} color="success">{okCount}成功</Tag>
            <Tag icon={<CloseCircleOutlined />} color="error">{record.failCount}失败</Tag>
          </div>
        )
      }
    },
    {
      title: '任务执行时间',
      dataIndex: 'duration',
      key: 'duration',
      width: 120,
      render: (duration) => `${duration} ms`
    },
    {
      title: '开始时间/结束时间',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (startTime, record) => `${startTime} ~ ${record.endTime}`
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
        <div className="rss-rss-page page">
          <FetchTable
            req={fetchRssPullJobsReq}
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