import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

export default class CommonTable extends React.Component {


    static propTypes = {
        totalCount: PropTypes.number,
        onFetch: PropTypes.func,
        children: PropTypes.any
    }

    componentDidMount() {
        this.props.onFetch && this.props.onFetch(1, 10);
    }

    reload = (page, pageSize) => {
        console.log('111');
        this.page = page || this.page;
        this.pageSize = pageSize || this.pageSize;
        this.props.onFetch && this.props.onFetch(this.page, this.pageSize)
    }

    page = 1

    pageSize = 10

    render() {
        const paginationProps = {
            showQuickJumper: true,
            showSizeChanger: true,
            total: this.props.totalCount,
            onChange: this.reload,
            onShowSizeChange: this.reload
        }

        return (
            <Table pagination={paginationProps} {...this.props}>
                {this.props.children}
            </Table>
        )
    }

}