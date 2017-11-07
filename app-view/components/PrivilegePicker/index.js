import React from 'react';
import PropTypes from 'prop-types';
import { Modal, message, Alert } from 'antd';
import { connect } from 'dva';
import CommonTable from '../CommonTable';

@connect(state => ({
    visible: state.modal['PrivilegePicker'],
    menu: state.app.menu
}))
export default class PrivilegePicker extends React.Component {

    static propTypes = {
        visible: PropTypes.bool,
        title: PropTypes.string,
        privileges: PropTypes.array,
        onConfirm: PropTypes.array
    }

    static defaultProps = {
        visible: false,
        privileges: [],
        title: '权限管理'
    }

    onOk = () => {

    }

    wrapMenuData = (menu) => {
        let itemToDelete = [];
        for(let i of menu) {
            if(i.hidden) itemToDelete.push(i);
            else if(i.children && i.children.length === 0) delete i.children;
            else if(i.children) this.wrapMenuData(i.children);
            else if(i.extraFunctions) i.children = i.extraFunctions;
        }
        console.log(1, menu, itemToDelete)
        menu = menu.removeObjects(...itemToDelete);
        console.log(2, menu)
    }

    render() {
        const { visible, title, dispatch, menu } = this.props;
        this.wrapMenuData(menu);
        const columns = [
            {
                title: '名称',
                key: 'name',
                dataIndex: 'name',
                width: '20%'
            }
        ]
        console.log(menu);

        return (
            <Modal
                visible={visible}
                title={title}
                onOk={this.onOk}
                width={1000}
                onCancel={() => dispatch({ type: 'modal/close', payload: 'PrivilegePicker' })}>
                <CommonTable
                    style={{ height: 400 }}
                    pagination={false}
                    scroll={{ y: true, x: true }}
                    columns={columns}
                    dataSource={menu}
                    defaultExpandAllRows />
            </Modal>
        )
    }

}