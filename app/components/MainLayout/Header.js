import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'dva/router';
const { SubMenu } = Menu;
const { Header } = Layout;

export default ({ path }) => (
	<Header>
		<Menu
			selectedKeys={[path]}
			theme="dark"
			mode="horizontal"
			style={{ lineHeight: '64px' }}
		>
			<Menu.Item key="/quickstart">
				<Link to="/quickstart">快速开始</Link>
			</Menu.Item>
			<Menu.Item key="/react-wxeap">
				<Link to="/react-wxeap">组件</Link>
			</Menu.Item>
			<Menu.Item key="/web-api">
				<Link to="/web-api">WEB API</Link>
			</Menu.Item>
			<Menu.Item key="/prototypes">
				<Link to="/prototypes">原型设计</Link>
			</Menu.Item>
		</Menu>
	</Header>
)
