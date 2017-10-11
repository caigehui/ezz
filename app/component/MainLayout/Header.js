import React from 'react';
import { Layout, Menu, Dropdown, Row, Col, Icon, Avatar } from 'antd';
import { Link } from 'dva/router';
import styles from './Header.less';
import { connect } from 'dva';
const { Header } = Layout;
const { SubMenu, ItemGroup } = Menu;

function MyHeader({ collapsed, dispatch, user }) {
	
	function onMenuClick({ key }) {
		console.log(key);
	}

	return (
		<Header className={styles.header}>
			<Row type="flex" justify="right">
				<Col span={8}>
					<Icon
						className={styles.trigger}
						type={collapsed ? 'menu-unfold' : 'menu-fold'}
						onClick={() => dispatch({ type: 'app/toggleCollapsed' })}
					/>
				</Col>
				<Col span={16} className={styles.menuCol}>
					<Menu
						mode="horizontal"
						className={styles.menu}
						selectedKeys={[]}
						onClick={onMenuClick}>
						<SubMenu
							title={
								<span className={styles.user}>
									<Avatar src={'dsada'} icon="user"/>
									<span> {user ? user.username : '未知用户'} </span>
								</span>}>
								<Menu.Item key="userInfo"><Icon type="user"/>个人信息</Menu.Item>
								<Menu.Item key="userSetting"><Icon type="setting"/>偏好设置</Menu.Item>
								<Menu.Item key="logout"><Icon type="logout"/>退出登录</Menu.Item>
						</SubMenu>
					</Menu>
				</Col>
			</Row>
		</Header>
	)
}

export default connect(({ app }) => ({ collapsed: app.collapsed, user: app.user }))(MyHeader);