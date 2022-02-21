import { Table } from 'antd';
import React, { Component, Fragment } from 'react';
import SearchForm from './SearchForm';

class FetchTable extends Component {

  state = {
    tableLoading: false,
    pageNum: 1,
    pageSize: 20,
    total: 0,
    tableData: [],
    condition: this.props.initSearchCondition || {}
  }

  componentDidMount() {
    if (this.props.bindTable) {
      this.props.bindTable(this);
    }
    this.reqTableData();
  }

  refreshTableData = (callback) => {
    callback(this.state.tableData, (tableData) => { this.setState({ tableData }) });
  }

  reqTableData = () => {
    console.log(this.state.condition)
    this.setState({ tableLoading: true })
    this.props.req({
      ...this.state.condition, pageNum: this.state.pageNum, pageSize: this.state.pageSize
    })
      .then(res => {
        this.setState({ tableData: res.records, pageNum: res.current, pageSize: res.size, total: res.total })
      }).finally(() => {
        this.setState({ tableLoading: false })
      })
  }

  handleChangePage = (pageNum, pageSize) => {
    this.setState({ pageNum, pageSize }, () => {
      this.reqTableData()
    })
  }

  handleSearch = (condition) => {
    console.log(condition)
    this.setState({ condition }, () => {
      this.reqTableData()
    })
  }

  render() {
    const { tableLoading, tableData, pageSize, total } = this.state
    return (
      <Fragment>
        <SearchForm fields={this.props.form} loading={tableLoading} onSearch={this.handleSearch} />
        <div style={{ height: '1rem' }} />
        <Table
          loading={tableLoading}
          size="small"
          bordered
          columns={this.props.columns}
          dataSource={tableData}
          pagination={{ pageSize, total, onChange: this.handleChangePage }} />
      </Fragment>
    )
  }
}

export default FetchTable