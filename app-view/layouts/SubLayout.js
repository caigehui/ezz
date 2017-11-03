import React from 'react';
import { Icon, Menu, Switch, Layout } from 'antd';
import { Route, Link, routerRedux } from 'dva/router';
import { connect } from 'dva';
import styles from './SubLayout.less';
import { getMenuItemByKey } from 'utils/helper';
import { PageHeader } from 'components';
const { SubMenu, Item } = Menu;
const { Content } = Layout;

function SubLayout({
    match,
    location,
    children,
    dispatch,
    menu,
    user,
    privileges,
    isMobile,
    functionPathForMenu,
    renderExtra
}) {
    const item = getMenuItemByKey(menu, match.url);
    // 如果地址错误则强制修改
    if (functionPathForMenu[item.key] !== match.url) functionPathForMenu[item.key] = match.url;
    return (
        <Layout className={styles.container}>
            <PageHeader renderExtra={renderExtra}>
                {item.extraFunctions && item.extraFunctions.length > 0 ?
                    <Menu
                        style={{ borderBottom:  0}}
                        mode="horizontal"
                        selectedKeys={[functionPathForMenu[item.key] || match.url]}
                        onSelect={i => { dispatch({ type: 'app/save', payload: { functionPathForMenu: { ...functionPathForMenu, [item.key]: i.key } } }) }}
                    >
                        {[<Item key={item.key} style={{ padding: '0 5px', marginRight: 30 }}><Link to={item.key}></Link>{item.name}</Item>].concat(item.extraFunctions.map((i, index) => <Item key={i.key} style={{ padding: '0 5px', marginRight: 30 }}><Link to={i.key}></Link>{i.name}</Item>))}
                    </Menu>
                    :
                    null
                }
            </PageHeader>
            <Content className={styles.content}>
                {children}
            </Content>
        </Layout>
    )
}

export default connect(({ app }) => ({ ...app }))(SubLayout);