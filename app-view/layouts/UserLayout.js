import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'dva/router';
import { Icon } from 'antd';
import GlobalFooter from 'components/GlobalFooter';
import styles from './UserLayout.less';

function UserLayout({ children }) {
	return (
		<div className={styles.container}>
			<div className={styles.top}>
				<div className={styles.header}>
					<Link to="/">
						<img alt="" className={styles.logo} src={require('assets/logo-blue.svg')} />
						<span className={styles.title}>Ezz Example</span>
					</Link>
				</div>
				<p className={styles.desc}>Ezz Example 是实验性的新前端平台</p>
			</div>
			{children}
			<GlobalFooter className={styles.footer} />
		</div>
	);
}

export default UserLayout;
