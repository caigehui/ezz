import React from 'react';
import bind from 'bind';
import { CommonTable } from 'components';
import { Layout, Table, Icon, Avatar, Button, Badge, Menu, Dropdown, Modal } from 'antd';
const { Column } = Table;
const confirm = Modal.confirm;
import styles from './index.less';

const PAGE_SIZE = 10;

function User({
    users,
    count,
    page,
    pageSize,
    dispatch,
    loading }) {

    function onFetch(page, pageSize) {
        dispatch({ type: 'user/query', payload: { page, pageSize } })
    }

    function renderName(text, record) {
        return (
            <div className={styles.nameColumn}>
                <Avatar src={record.info.avatar} icon="user" />
                <span>{record.info.name}</span>
            </div>
        )
    }

    function renderStatus(text, record) {
        switch (record.status) {
            case '使用中':
                return <span><Badge status="success" />使用中</span>
            case '禁用中':
                return <span><Badge status="error" />禁用中</span>
            case '冻结中':
                return <span><Badge status="warning" />冻结中</span>
        }
    }

    function renderAction(text, record) {

        return (
            <div className={styles.actionColumn}>
                {record.status === '使用中' && <a href="javascript:void(0);">禁用</a>}
                {record.status === '禁用中' && <a href="javascript:void(0);">启用</a>}
                {record.status === '冻结中' && <a href="javascript:void(0);">解冻</a>}
                <div className={styles.seperator} />
                <a href="javascript:void(0);" onClick={() => {
                    confirm({
                        title: '确定注销该账号？',
                        content: '注销后不能再启用该账号，请谨慎操作',
                        onText: '确定',
                        okType: 'danger',
                        cancelText: '取消',
                        onOk() {

                        },
                        onCancel() {

                        }
                    })
                }}>注销</a>
            </div>
        )
    }

    return (
        <Layout style={{ height: '100%', background: 'white', padding: 24 }}>
            <CommonTable
                onFetch={onFetch}
                totalCount={count}
                dataSource={users}
                rowKey={record => record._id}
                loading={loading.effects['user/query']}>
                <Column title="姓名" key="name" render={renderName} />
                <Column title="手机号码" dataIndex="info.mobile" key="mobile" />
                <Column title="角色" dataIndex="role.name" key="role" />
                <Column title="状态" render={renderStatus} key="status" />
                <Column title="上次登录时间" dataIndex="lastLoginTime" key="lastLoginTime" />
                <Column title="操作" key="action" render={renderAction} />
            </CommonTable>
        </Layout>
    );
}

function renderExtra({ item, dispatch }) {
    return (
        <div className={styles.header}>
            <h1>{item.name}</h1>
            <Button type="primary" icon="plus" onClick={() => dispatch({ type: 'user/addUser' })}>
                新增用户
            </Button>
        </div>
    )
}

export default bind(({ loading, user }) => ({ loading, ...user }), { renderExtra })(User);