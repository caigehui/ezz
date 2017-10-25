import React from 'react';
import { Layout, Icon, Avatar, Menu, Switch, Row, Col, } from 'antd';
import { Route, Link } from 'app';
import { connect } from 'dva';
import Loader from '../Loader';
import styles from './Mobile.less';
import classNames from 'classnames';
const { Footer, Sider, Content, Header } = Layout;
const { SubMenu, Item } = Menu;

function Mobile({
    children,
    match,
    getMenu,
    dispatch,
    openMobileMenu,
    user,
    menu,
    openKeys,
    loading,
}) {
    return (
        <Layout style={{ height: '100%' }}>
            <Loader spinning={loading.effects['app/init']} />
            <Header className={styles.header}>
                <img src={user.currentCompany.logo || require('assets/logo.svg')} className={styles.logo} />
                <span className={styles.companyName}>{user.currentCompany.shortname || user.currentCompany.name}</span>
                <div className={classNames(styles.btn, {
                    [styles.btnClose]: openMobileMenu
                })} onClick={() => dispatch({ type: 'app/toggleMobileMenu' })}>
                    <em />
                    <em />
                    <em />
                </div>
                <div className={classNames(styles.menu, {
                    [styles.menuOpen]: openMobileMenu
                })}>
                    <Menu
                        theme="dark"
                        mode="inline"
                        openKeys={openKeys}
                        onSelect={() => setTimeout(() => {
                            dispatch({ type: 'app/toggleMobileMenu' })
                        }, 200)}
                        onOpenChange={(openKeys) => dispatch({ type: 'app/save', payload: { openKeys } })}
                        defaultSelectedKeys={[match.url]}>
                        {menu.map(node => getMenu(node))}
                    </Menu>
                    <div className={styles.me}>
                        <Avatar src={user.info.avatar} size="large" icon="user" />
                        <span className={styles.name}>{user ? user.info.name : '未知用户'}</span>
                        <span className={styles.meBtn}><Icon type="user" />个人信息</span>
                        <span className={styles.meBtn}><Icon type="setting" />偏好设置</span>
                        <span className={styles.meBtn} onClick={() => dispatch({ type: 'app/logout' })}><Icon type="logout" />退出登录</span>
                    </div>
                </div>
            </Header>
            <Layout>
                <Content className={styles.content}>
                    {children}
                </Content>
                <Footer className={styles.footer}>
                    Copyright © 2000-2017 WxSoft ZhuHai Inc. All Rights Reserved
                </Footer>
            </Layout>
        </Layout>
    );
}

export default connect(({ app, loading }) => ({ ...app, loading }))(Mobile);