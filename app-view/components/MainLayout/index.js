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
                        <img src={require('assets/logo-dark.svg')} className={styles.logo} />
                        {!collapsed ? <span className={styles.name}>WxDocs</span> : null}
                    </div>
                </Link>
                <Menu theme="dark" mode="inline" selectedKeys={['']}>
                    {menu.map(node => getMenu(node))}
                </Menu>
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

