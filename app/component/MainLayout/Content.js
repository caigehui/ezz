import React from 'react';
import { Layout, Menu, Icon } from 'antd';
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

export default ({ children, match }) => (
    <Content style={{ padding: '20px 50px', flex: 1 }}>
        <Layout style={{ padding: '24px 0', background: '#fff', height: '100%' }}>
            <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                    selectedKeys={[match.url]}
                    mode="inline"
                    style={{ height: '100%' }}
                >
                    <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>} />
                    <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>} />
                    <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>} />
                </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
                {children}
            </Content>
        </Layout>
    </Content>
)