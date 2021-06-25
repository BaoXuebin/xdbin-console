import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import React, { Fragment, useState } from 'react';

const FieldItem = ({ field }) => {
  if ((field.type === 'input' || field.type === undefined)) {
    return <Input placeholder={field.placeholder || field.label} />
  } else if (field.type === 'select') {
    return <Select placeholder={field.placeholder || field.label} defaultValue={field.defaultValue}>
      {
        field.dataSet.map(d => <Select.Option key={d.value} value={d.value}>{d.label}</Select.Option>)
      }
    </Select>
  }
  return <Fragment />
}

const SearchForm = ({ fields = [], loading = false, onSearch }) => {
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();

  const getFields = () => {
    const children = [];
    (expand ? fields : fields.slice(0, 8)).forEach(field => {
      children.push(
        <Col span={6} key={field.name}>
          <Form.Item
            name={field.name}
            label={field.label}
            rules={field.rules || []}
          >
            <FieldItem field={field} />
          </Form.Item>
        </Col>,
      );
    })
    return children;
  };

  const onFinish = (values) => {
    console.log(values)
    // if (typeof onSearch === 'function') {
    //   onSearch(values)
    // }
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      onFinish={onFinish}
    >
      <Row gutter={24}>{getFields()}</Row>
      <Row>
        <Col span={6} style={{ textAlign: 'left' }}>
          <Button loading={loading} type="primary" htmlType="submit">
            搜索
          </Button>
          <Button
            style={{ margin: '0 8px' }}
            onClick={() => {
              form.resetFields();
            }}
          >
            清空
          </Button>
          {
            fields.length > 8 &&
            <a
              style={{ fontSize: 12 }}
              onClick={() => {
                setExpand(!expand);
              }}
            >
              {expand ? <UpOutlined /> : <DownOutlined />} Collapse
          </a>
          }
        </Col>
      </Row>
    </Form>
  );
};

export default SearchForm