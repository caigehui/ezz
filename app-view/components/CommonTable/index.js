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

    render() {
        const paginationProps = {
            showQuickJumper: true,
            showSizeChanger: true,
            total: this.props.totalCount,
            onChange: (page, pageSize) => this.props.onFetch && this.props.onFetch(page, pageSize),
            onShowSizeChange: (page, pageSize) => this.props.onFetch && this.props.onFetch(page, pageSize)
        }

        return (
            <Table pagination={paginationProps} {...this.props}>
                {this.props.children}
            </Table>
        )
    }

}