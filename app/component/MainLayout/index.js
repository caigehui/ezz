import React from 'react';
import { Layout, Icon, Menu, Switch } from 'antd';
import { Route, Link } from 'dva/router';
import { connect } from 'dva';
import Header from './Header';
const { Footer, Sider, Content } = Layout;
import styles from './index.less';

function MainLayout({ children, match, collapsed, dispatch }) {
    return (
        <Layout style={{ height: '100%' }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
            >
                <Link to="/">
                    <div className={styles.top}>
                        <img src={require('asset/logo-dark.svg')} className={styles.logo} />
                        {!collapsed ? <span className={styles.name}>WxDocs</span> : null}
                    </div>
                </Link>
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Icon type="user" />
                        <span>nav 1</span>
                    </Menu.Item>
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
        </Layout>)
}

export default connect(({ app }) => ({ collapsed: app.collapsed }))(MainLayout);

