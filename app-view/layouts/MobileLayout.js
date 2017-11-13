import React from 'react';
import { Layout, Icon, Avatar, Menu } from 'antd';
import { connect } from 'dva';
import { getMenuItemByKey } from 'utils/helper';
import { Loader, GlobalFooter } from 'components';
import styles from './MobileLayout.less';
import classNames from 'classnames';
const { Content, Header } = Layout;

function MobileLayout({
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
    const menuItem = getMenuItemByKey(menu, match.url);
    return (
        <Layout style={{ height: '100%', backgroundColor: 'rgb(243, 243, 243)' }}>
            <Loader spinning={loading.effects['app/init']} fullScreen/>
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
                            dispatch({ type: 'app/toggleMobileMenu' });
                        }, 200)}
                        onOpenChange={(openKeys) => dispatch({ type: 'app/save', payload: { openKeys } })}
                        defaultSelectedKeys={menuItem ? [menuItem.key] : []}>
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
                <GlobalFooter/>
            </Layout>
        </Layout>
    );
}

export default connect(({ app, loading }) => ({ ...app, loading }))(MobileLayout);