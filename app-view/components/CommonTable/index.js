import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { connect } from 'dva';

class CommonTable extends React.Component {


    static propTypes = {
        totalCount: PropTypes.number,
        onFetch: PropTypes.func,
        children: PropTypes.any,
        reloadTriggers: PropTypes.array
    }

    static defaultProps = {
        reloadTriggers: [],
        totalCount: 0
    }

    constructor(props) {
        super(props);
        this.reloadTriggers = [...props.reloadTriggers];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.reloadTriggers.toString() !== this.reloadTriggers.toString()) {
            for (let i = 0; i < nextProps.reloadTriggers.length; i++) {
                if (nextProps.reloadTriggers[i] === false && this.reloadTriggers[i] === true) {
                    this.reload(1);
                }
                this.reloadTriggers[i] = nextProps.reloadTriggers[i];
            }
        }
    }

    componentDidMount() {
        this.props.onFetch && this.props.onFetch(1, 10);
    }

    reload = (page, pageSize) => {
        this.page = page || this.page;
        this.pageSize = pageSize || this.pageSize;
        this.props.onFetch && this.props.onFetch(this.page, this.pageSize);
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
        };

        const mobileProps = this.props.isMobile ? {
            scroll: { x: 1000 },
            style: { WebkitOverflowScrolling: 'touch' }
        } : {};

        return (
            <Table
                pagination={paginationProps}
                {...mobileProps}
                {...this.props} >
                {this.props.children}
            </Table>
        );
    }

}

export default connect(({ app }) => ({ isMobile: app.isMobile }))(CommonTable);