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
    renderExtra,
    children,
    dispatch
}) {
    const item = getBreadItemByKey(menu, path);
    return (
        <div className={styles.container}>
            <Bread pathname={pathname} path={path} menu={menu}/>
            <div className={styles.extraContainer}>
                {!renderExtra && <h1>{item.name}</h1>}
                {renderExtra && renderExtra({ item, dispatch })}
            </div>
            {children}
        </div>
    )
}

export default connect(({ app }) => ({ menu: app.menu }))(withRouter(PageHeader));