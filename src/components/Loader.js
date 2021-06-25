import { Spin } from 'antd';
import React from 'react';

const Loader = ({ isLoading, error }) => {
  if (isLoading) {
    return (
      <div style={{ width: '100%', textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  } else if (error) {
    console.error(error);
    return <p>Failed Load.</p>
  }
  return null;
};

export default Loader;