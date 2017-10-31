import React from 'react';
import { Layout, Icon, Menu, Switch } from 'antd';
import { Route, Link, routerRedux } from 'app';
import { connect } from 'dva';
import styles from './index.less';
import { getMenuItemByKey } from 'utils/helper';
const { Sider, Content } = Layout;
const { SubMenu, Item } = Menu;

function SubLayout({
        match,
    location,
    children,
    dispatch,
    menu,
    user,
    privileges,
    isMobile,
    functionPathForMenu
}) {
    const item = getMenuItemByKey(menu, match.url);
    // 强制修改
    if(functionPathForMenu[item.key] !== match.url) functionPathForMenu[item.key] = match.url;
    return (
        <Layout className={styles.layout}>
            {item.extraFunctions && item.extraFunctions.length > 0 ?
                isMobile ?
                    <Menu
                        mode="horizontal"
                        selectedKeys={[functionPathForMenu[item.key] || match.url]}
                        onSelect={i => { dispatch({ type: 'app/save', payload: { functionPathForMenu: { ...functionPathForMenu, [item.key]: i.key } } }) }}
                        style={{ height: '100%' }}
                    >
                        <Item key={item.key}><Link to={item.key}>{item.name}</Link></Item>
                        {item.extraFunctions.map((i, index) => <Item key={i.key}><Link to={i.key}></Link>{i.name}</Item>)}
                    </Menu>
                    :
                    <Sider width={180}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={[match.url]}
                            selectedKeys={[functionPathForMenu[item.key] || match.url]}
                            style={{ height: '100%' }}
                            onSelect={i => { dispatch({ type: 'app/save', payload: { functionPathForMenu: { ...functionPathForMenu, [item.key]: i.key } } }) }}
                        >
                            <Item key={item.key}><Link to={item.key}>{item.name}</Link></Item>
                            {item.extraFunctions.map((i, index) => <Item key={i.key}><Link to={i.key}></Link>{i.name}</Item>)}
                        </Menu>
                    </Sider>
                :
                null
            }
            <Content className={styles.content}>
                {children}
            </Content>
        </Layout>
    )
}

export default connect(({ app }) => ({ ...app }))(SubLayout);