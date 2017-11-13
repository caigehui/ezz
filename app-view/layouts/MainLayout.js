import React from 'react';
import { Layout, Icon, Menu } from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { checkAuth, getMenuItemByKey } from 'utils/helper';
import classNames from 'classnames';
import Header from './Header';
import { Loader, GlobalFooter } from 'components';
import styles from './MainLayout.less';
import isarray from 'isarray';
import MobileLayout from './MobileLayout';
const { Sider } = Layout;
const { SubMenu, Item } = Menu;

function MainLayout({
    children,
    match,
    dispatch,
    collapsed,
    user,
    menu,
    privileges,
    openKeys,
    loading,
    isMobile,
    functionPathForMenu
}) {
    if (!user) return null;
    function getMenu(node) {
        // 校验权限
        if (!checkAuth(privileges, node.key)) return null;
        // 不显示隐藏的菜单
        if (node.hidden) return null;
        if (node.children && isarray(node.children) && node.children.length > 0) {
            return (
                <SubMenu
                    key={node.key}
                    title={<span><Icon type={node.iconType} /><span>{node.name}</span></span>}>
                    {node.children.map(node => getMenu(node))}
                </SubMenu>
            );
        } else {
            return (
                <Item key={node.key}>
                    <Link to={functionPathForMenu[node.key] || node.key}>
                        {node.iconType ? <Icon type={node.iconType} /> : null}
                        <span>{node.name}</span>
                    </Link>
                </Item>
            );
        }
    }
    const menuItem = getMenuItemByKey(menu, match.url);
    return (
        isMobile
            ? <MobileLayout children={children} match={match} getMenu={getMenu} />
            :
            <Layout>
                <Loader spinning={loading.effects['app/init']} fullScreen />
                <Sider
                    width={256}
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    className={styles.sider}
                >
                    <Link to="/">
                        <div className={classNames(styles.company, {
                            [styles.companyCollapse]: collapsed
                        })}>
                            <img src={user.currentCompany.logo || require('assets/logo.svg')} className={styles.companyLogo} />
                            {!collapsed ? <span className={styles.companyName}>{user.currentCompany.shortname || user.currentCompany.name}</span> : null}
                        </div>
                    </Link>
                    {
                        collapsed ?
                            <Menu
                                inlineCollapsed
                                theme="dark"
                                mode="inline"
                                defaultSelectedKeys={menuItem ? [menuItem.key] : []}>
                                {menu.map(node => getMenu(node))}
                            </Menu>
                            :
                            <Menu
                                theme="dark"
                                mode="inline"
                                openKeys={openKeys}
                                onOpenChange={(openKeys) => dispatch({ type: 'app/save', payload: { openKeys } })}
                                defaultSelectedKeys={menuItem ? [menuItem.key] : []}>
                                {menu.map(node => getMenu(node))}
                            </Menu>
                    }
                </Sider>
                <Layout className={styles.layout}>
                    <Header user={user} match={match} />
                    {children}
                    <GlobalFooter />
                </Layout>
            </Layout>
    );
}

export default connect(({ app, loading }) => ({ ...app, loading }))(MainLayout);

