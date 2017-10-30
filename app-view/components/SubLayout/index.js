import React from 'react';
import { Layout, Icon, Menu, Switch } from 'antd';
import { Route, Link, routerRedux } from 'app';
import { connect } from 'dva';
import styles from './index.less';
import { getMenuItemByKey } from 'utils/helper';
import QueueAnim from 'rc-queue-anim';
const { Sider, Content } = Layout;
const { SubMenu, Item } = Menu;

class SubLayout extends React.Component {

    componentDidMount() {
        const item = getMenuItemByKey(this.props.menu, this.props.match.url);
        if (this.props.functionPathForMenu[item.key] && this.props.match.url !== this.props.functionPathForMenu[item.key]) {
            this.props.dispatch(routerRedux.replace({ pathname: this.props.functionPathForMenu[item.key] }))
        }
    }

    render() {
        const {
            match,
            location,
            children,
            dispatch,
            menu,
            user,
            privileges,
            isMobile,
            functionPathForMenu
        } = this.props;
        const item = getMenuItemByKey(menu, match.url);
        return (
            <Layout className={styles.layout}>
                    {item.extraFunctions && item.extraFunctions.length > 0 ?
                        isMobile ?
                            <Menu
                                mode="horizontal"
                                defaultSelectedKeys={[match.url]}
                                selectedKeys={[functionPathForMenu[item.key]]}
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
                                    selectedKeys={[functionPathForMenu[item.key]]}
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
}

export default connect(({ app }) => ({ ...app }))(SubLayout);