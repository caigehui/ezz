import React from 'react';
import { Layout, Menu, Dropdown, Row, Col, Icon, Avatar, Input, AutoComplete, Badge, Popover } from 'antd';
import { Link, routerRedux } from 'app';
import { connect } from 'dva';
import delay from 'utils/delay';
import styles from './Header.less';
import classNames from 'classnames';
const { Header } = Layout;
const { SubMenu, ItemGroup } = Menu;
const { Search } = Input;
const Option = AutoComplete.Option;
const OptGroup = AutoComplete.OptGroup;

const dataSource = [{
	title: '模块',
	children: [{
		title: '内部邮件',
		count: 32,
	}, {
		title: '通知公告',
		count: 2,
	}],
}, {
	title: '文章',
	children: [{
		title: 'JavaScript函数编程',
		count: 10000,
	}],
}];

function MyHeader({ dispatch, user, match }) {

	function onMenuClick({ key }) {
		if (key === 'logout') {
			dispatch({ type: 'app/logout' });
		}
	}

	function renderTitle(title) {
		return (
			<span className={styles.searchTitle}>
				{title}
				<a
					style={{ float: 'right' }}
					href="https://www.google.com/search?q=antd"
					target="_blank"
					rel="noopener noreferrer">
					更多
				</a>
			</span>
		);
	}

	const options = dataSource.map((group, index) => (
		<OptGroup
			key={index}
			label={renderTitle(group.title)}
		>
			{group.children.map(opt => (
				<Option key={opt.title} value={opt.title}>
					{opt.title}
					<span className={styles.searchItemCount}>{opt.count} 未读</span>
				</Option>
			))}
		</OptGroup>
	)).concat([
		<Option disabled key="all" className={styles.showAll}>
			<a
				href="https://www.google.com/search?q=antd"
				target="_blank"
				rel="noopener noreferrer"
			>
				查看所有结果
		  </a>
		</Option>,
	]);

	return (
		<Header className={styles.header}>
			<Row type="flex" justify="right">
				<Col span={4} className={styles.searchCol}>
					<Icon type="search" className={styles.icon} />
					<AutoComplete
						dropdownMatchSelectWidth={false}
						dropdownStyle={{ width: 300 }}
						size="large"
						style={{ width: '100%' }}
						dataSource={options}
						optionLabelProp="value"
					>
						<input placeholder="搜索..." className={styles.input} />
					</AutoComplete>
				</Col>
				<Col span={20} className={styles.menuCol}>
					<Me user={user} dispatch={dispatch} match={match}/>
					<div className={styles.buttonWrapper}>
						<Badge dot>
							<Icon type="notification" style={{ fontSize: 20 }} />
						</Badge>
					</div>
					<div className={styles.buttonWrapper}>
						<Icon type="mail" style={{ fontSize: 20 }} />
					</div>
					<div className={styles.buttonWrapper}>
						<Icon type="message" style={{ fontSize: 20 }} />
					</div>
				</Col>
			</Row>
		</Header>
	)
}

class Me extends React.Component {

	state = {
		visible: false
	}

	hide = () => {
		this.setState({
			visible: false,
		});
	}

	handleVisibleChange = (visible) => {
		this.setState({ visible });
	}

	onPersonClick = async () => {
		const { user, dispatch, match } = this.props;
		this.hide();
		await delay(200);
		match.url !== `/person/${user._id}` && dispatch(routerRedux.push({
			pathname: `/person/${user._id}`
		}));
	}

	onLogout = async () => {
		const { dispatch } = this.props;
		this.hide();
		await delay(200);
		dispatch({ type: 'app/logout' });
	}

	render() {
		const { user } = this.props;
		return (
			<Popover
				placement="bottom"
				trigger="click"
				visible={this.state.visible}
				onVisibleChange={this.handleVisibleChange}
				content={
					<div className={styles.popoverWrapper}>
						<div onClick={this.onPersonClick}><Icon type="user" />个人信息</div>
						<div onClick={this.hide}><Icon type="setting" />偏好设置</div>
						<div onClick={this.onLogout}><Icon type="logout" />退出登录</div>
					</div>
				}>
				<div className={classNames(styles.buttonWrapper, styles.user)}>
					<Avatar src={user.info.avatar} icon="user" />
					<span> {user ? user.info.name : '未知用户'} </span>
				</div>
			</Popover>
		)
	}
}

export default connect(({ app }) => ({ collapsed: app.collapsed, user: app.user }))(MyHeader);