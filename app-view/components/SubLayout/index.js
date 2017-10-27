import React from 'react';
import { Layout, Icon, Menu, Switch } from 'antd';
import { Route, Link } from 'app';
import { connect } from 'dva';
import classNames from 'classnames';
import styles from './index.less';
import { getMenuItemByKey } from 'utils/helper';
const { Sider, Content } = Layout;
const { SubMenu, Item } = Menu;

function SubLayout({
    match,
    location,
    children,
    menu,
    user,
    privileges
}) {
    const item = getMenuItemByKey(menu, match.url);
    console.log(match.url, item);
    return (
        <Layout className={styles.layout}>
            {item.extraFunctions.length > 0 ?
                <Sider width={180}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[location.pathname]}
                        style={{ height: '100%' }}
                    >
                        <Item key={match.url}><Link to={match.url}>{item.name}</Link></Item>
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