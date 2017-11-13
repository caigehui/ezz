import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Alert, Checkbox, Icon, Button } from 'antd';
import { connect } from 'dva';
import CommonTable from '../CommonTable';
import _ from 'lodash';

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
        privileges: ['/', '/system', '/system/user', '/system/user/create', '/system/user/cancel', '/system/user/ban', '/system/user/role', '/system/user/role'],
        title: '权限管理'
    }

    state = {
        privileges: this.props.privileges
    }

    onOk = () => {
        this.props.onConfirm && this.props.onConfirm(this.state.privileges);
    }

    /**
     * 递归处理数据
     */
    wrapMenuData = (menu) => {

        let temp = [];
        for (let i of menu) {
            if (i.hidden) continue;
            else if (i.children && i.children.length > 0) temp = [...temp, { ...i, children: this.wrapMenuData(i.children) }];
            else if (i.extraFunctions) temp = [...temp, { ...i, children: i.extraFunctions }];
        }
        return temp;
    }

    render() {
        const { visible, title, dispatch, menu } = this.props;
        const { privileges } = this.state;
        const columns = [
            {
                title: '名称',
                key: 'name',
                render: (text, record) => <span>{record.iconType && <Icon type={record.iconType} style={{ marginRight: 5 }} />}{record.name}</span>,
                width: '40%'
            },
            {
                title: '功能',
                key: 'actions',
                render: (text, record) => {
                    return record.actions && record.actions.map(action => (
                        <Checkbox
                            key={action.key}
                            checked={!!privileges.find(i => i === action.key)}
                            onChange={(e) => this.setState({
                                privileges: e.target.checked
                                    ?
                                    _.uniq([...privileges, action.key, record.key])
                                    :
                                    privileges.removeByCondition(i => i === action.key)
                            })}>
                            {action.name}
                        </Checkbox>
                    ));
                }
            }
        ];

        const rowSelection = {
            onSelect: (record, selected) => {
                this.setState({
                    privileges: selected
                        ?
                        _.uniq([
                            ...privileges,
                            ...record.actions.map(i => i.key),
                            record.key])
                        :
                        privileges.removeByCondition(i => i === record.key || record.actions && record.actions.find(j => j.key === i))
                });
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                this.setState({
                    privileges: selected
                        ?
                        [
                            ...privileges,
                            ...changeRows.map(i => i.key),
                            ..._.flatten(changeRows.map(i => (i.actions && i.actions.map(j => j.key)) || []))]
                        :
                        privileges.removeByCondition(i =>
                            changeRows.find(j => j.key === i
                                ||
                                j.actions && j.actions.find(z => z.key === i)))
                });
            },
            selectedRowKeys: privileges
        };

        return (
            <Modal
                visible={visible}
                title={title}
                onOk={this.onOk}
                width={800}
                footer={[
                    <Button key="back" onClick={() => dispatch({ type: 'modal/close', payload: 'PrivilegePicker' })}>取消</Button>,
                    <Button key="reset" onClick={() => this.setState({ privileges: this.props.privileges })}>重置</Button>,
                    <Button key="submit" type="primary" onClick={this.onOk}>确定</Button>,
                ]}
                onCancel={() => dispatch({ type: 'modal/close', payload: 'PrivilegePicker' })}>
                <Alert message="提示: 左侧的复选框代表菜单权限" type="info" showIcon style={{ marginBottom: 24 }} closable />
                <CommonTable
                    rowSelection={rowSelection}
                    style={{ height: 360 }}
                    pagination={false}
                    scroll={{ y: true, x: true }}
                    columns={columns}
                    dataSource={this.wrapMenuData(menu)}
                    defaultExpandAllRows />
            </Modal>
        );
    }

}