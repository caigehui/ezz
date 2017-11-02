import React from 'react';
import styles from './index.less';
import Bread from './Bread';
import { withRouter } from 'react-router'
import { getBreadItemByKey } from 'utils/helper';
import { connect } from 'dva';

function PageHeader({
    location: { pathname },
    match: { path },
    menu,
    children
}) {
    return (
        <div className={styles.container}>
            <Bread pathname={pathname} path={path} menu={menu}/>
            <h1>{getBreadItemByKey(menu, path).name}</h1>
            {children}
        </div>
    )
}

export default connect(({ app }) => ({ menu: app.menu }))(withRouter(PageHeader));