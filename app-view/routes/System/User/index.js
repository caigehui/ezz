import React from 'react';
import bind from 'bind';
import { Layout, Table, Icon, Avatar } from 'antd';
const { Column } = Table;
import styles from './index.less';

const PAGE_SIZE = 10;

function User({ users, dispatch, loading }) {

    function renderName(text, record) {
        return (
            <div className={styles.nameColumn}>
                <Avatar src={record.info.avatar} icon="user" />
				<span>{record.info.name}</span>
            </div>
        )
    }

    return (
        <Layout style={{ height: '100%', background: 'white', padding: 24 }}>
            <Table 
                dataSource={users} 
                rowKey={record => record._id}
                pagination={{ showQuickJumper: true, showSizeChanger: true }}
                loading={loading.effects['user/init']}>
                <Column title="姓名" key="name" render={renderName}/>
                <Column title="手机号码" dataIndex="info.mobile" key="mobile"/>
            </Table>
        </Layout>
    );
}

export default bind(({ loading, user }) => ({ loading, ...user }))(User);