import React from 'react';
import { Layout, Icon, Menu, Switch } from 'antd';
import { Route, Link } from 'app';
import { connect } from 'dva';
import Header from './Header';
import Loader from '../Loader';
import styles from './index.less';
import isarray from 'isarray';
const { Footer, Sider, Content } = Layout;
const { SubMenu, Item } = Menu;

function MainLayout({
    children,
    match,
    dispatch,
    collapsed,
    user,
    menu,
    loading
}) {
    if(!user) return null;

    function getMenu(node) {
        if (node.children && isarray(node.children) && node.children.length > 0) {
            return (
                <SubMenu
                    key={node.key}
                    title={<span><Icon type={node.iconType} /><span>{node.name}</span></span>}>
                    {node.children.map(node => getMenu(node))}
                </SubMenu>
            )
        } else {
            return (
                <Item key={node.key}>
                    <Link to={node.key}>
                        {node.iconType ? <Icon type={node.iconType} /> : null}
                        {node.name}
                    </Link>
                </Item>
            )
        }
    }

    return (
        <Layout style={{ height: '100%' }}>
            <Loader spinning={loading.effects['app/init']} />
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
            >
                <Link to="/">
                    <div className={styles.top}>
                        <img src={user.currentCompany.logo || require('assets/logo.svg')} className={styles.logo} />
                        {!collapsed ? <span className={styles.name}>{user.currentCompany.shortname || user.currentCompany.name}</span> : null}
                    </div>
                </Link>
                <Menu theme="dark" mode="inline" selectedKeys={['']}>
                    {menu.map(node => getMenu(node))}
                </Menu>
                <div className={styles.collapse}>
                    <Icon
                        className={styles.trigger}
                        type={collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={() => dispatch({ type: 'app/toggleCollapsed' })}
                    />
                </div>
            </Sider>
            <Layout>
                <Header />
                <Content className={styles.content}>
                    {children}
                </Content>
                <Footer className={styles.footer}>
                    Copyright © 2000-2017 WxSoft ZhuHai Inc. All Rights Reserved
                </Footer>
            </Layout>
        </Layout>
    )
}

export default connect(({ app, loading }) => ({ ...app, loading }))(MainLayout);

