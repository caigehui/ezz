import React from 'react';
import { Layout, Menu, Dropdown, Row, Col, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './Header.css'
const { Header } = Layout;
const { SubMenu, ItemGroup } = Menu;

export default ({ url }) => (
	<Header className={styles.header}>
		<Row className={styles.height}>
			<Col xs={24} sm={4} className={styles.height}>
				<Link to="/quickstart">
					<div className={styles.left}>
						<img src={require('../../assets/logo.svg')} className={styles.logo} />
						WxDocs
					</div>
				</Link>
			</Col>
			<Col xs={0} sm={20}>
				<Row type="flex" justify="right">
					<Col span={6}>

					</Col>
					<Col span={18} className={styles.menuCol}>
						<Menu
							selectedKeys={[url]}
							mode="horizontal"
							className={styles.menu}
						>
							<Menu.Item key="/quickstart">
								快速开始
								<Link to="/quickstart" />
							</Menu.Item>
							<Menu.Item key="/react-wxeap">
								组件
								<Link to="/react-wxeap" />
							</Menu.Item>
							<Menu.Item key="/web-api">
								WEB API
								<Link to="/web-api" />
							</Menu.Item>
							<Menu.Item key="/prototypes">
								原型设计
								<Link to="/prototypes" />
							</Menu.Item>
							<SubMenu title={<span><Icon type="user" />蔡戈辉</span>}>
								<ItemGroup title="Item 1">
									<Menu.Item key="setting:1">Option 1</Menu.Item>
									<Menu.Item key="setting:2">Option 2</Menu.Item>
								</ItemGroup>
								<ItemGroup title="Item 2">
									<Menu.Item key="setting:3">Option 3</Menu.Item>
									<Menu.Item key="setting:4">Option 4</Menu.Item>
								</ItemGroup>
							</SubMenu>
						</Menu>
					</Col>
				</Row>
			</Col>
		</Row>
		{/* 移动端菜单 */}
		<Dropdown overlay={
			<Menu>
				<ItemGroup title="Item 1">
					<Menu.Item key="setting:1">Option 1</Menu.Item>
					<Menu.Item key="setting:2">Option 2</Menu.Item>
				</ItemGroup>
				<ItemGroup title="Item 2">
					<Menu.Item key="setting:3">Option 3</Menu.Item>
					<Menu.Item key="setting:4">Option 4</Menu.Item>
				</ItemGroup>
			</Menu>
		} trigger={['click']}>
			<Icon className={styles.menuMobile} type="bars" />
		</Dropdown>
	</Header>
)
