import { CheckCircleOutlined, CloseCircleOutlined, MinusCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import React from 'react';

const PullStatusTag = ({ status }) => {
  if (status === 'OK') {
    return (
      <Tag icon={<CheckCircleOutlined />} color="success">
        <span>成功</span>
      </Tag>
    )
  } else if (status === 'WAITING') {
    return (
      <Tag icon={<SyncOutlined spin />} color="processing">
        <span>进行中</span>
      </Tag>
    )
  } else if (status === 'FAIL') {
    return (
      <Tag icon={<CloseCircleOutlined /> } color="error">
        <span>失败</span>
      </Tag>
    )
  }
  return (
    <Tag icon={<MinusCircleOutlined  /> } color="default">
      <span>未拉取</span>
    </Tag>
  )
}

export default PullStatusTag;