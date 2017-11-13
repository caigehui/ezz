import React from 'react';
import { Menu, Layout } from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';
import styles from './SubLayout.less';
import { getMenuItemByKey, checkAuth } from 'utils/helper';
import { PageHeader } from 'components';
const { Item } = Menu;
const { Content } = Layout;

function SubLayout({
    match,
    children,
    dispatch,
    menu,
    privileges,
    functionPathForMenu,
    button
}) {
    const item = getMenuItemByKey(menu, match.url);
    // 如果地址错误则强制修改
    if (functionPathForMenu[item.key] !== match.url) functionPathForMenu[item.key] = match.url;
    return (
        <Layout className={styles.container}>
            <PageHeader button={button}>
                {item.extraFunctions && item.extraFunctions.length > 0 ?
                    <Menu
                        style={{ borderBottom: 0 }}
                        mode="horizontal"
                        selectedKeys={[functionPathForMenu[item.key] || match.url]}
                        onSelect={i => {
 dispatch({ type: 'app/save', payload: { functionPathForMenu: { ...functionPathForMenu, [item.key]: i.key } } }); 
}}
                    >
                        {
                            [
                                <Item key={item.key} style={{ padding: '0 5px', marginRight: 30 }}>
                                    <Link to={item.key}></Link>{item.name}
                                </Item>,
                                ...item.extraFunctions.map(i => {
                                    if(!checkAuth(privileges, i.key)) return null;
                                    return (
                                        <Item key={i.key} style={{ padding: '0 5px', marginRight: 30 }}>
                                            <Link to={i.key}></Link>{i.name}
                                        </Item>
                                    );
                                })
                            ]
                        }
                    </Menu>
                    :
                    null
                }
            </PageHeader>
            <Content className={styles.content}>
                {children}
            </Content>
        </Layout>
    );
}

export default connect(({ app }) => ({ ...app }))(SubLayout);