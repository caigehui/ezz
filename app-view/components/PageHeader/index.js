import React from 'react';
import styles from './index.less';
import Bread from './Bread';
import { withRouter } from 'react-router'
import { getBreadItemByKey } from 'utils/helper';
import { connect } from 'dva';
import { Button } from 'antd';

function PageHeader({
    location: { pathname },
    match: { path },
    menu,
    renderExtra,
    children,
    dispatch,
    button
}) {
    const item = getBreadItemByKey(menu, path);
    return (
        <div className={styles.container}>
            <Bread pathname={pathname} path={path} menu={menu} />
            <div className={styles.header}>
                <h1>{item.name}</h1>
                <Button type="primary" icon={button.iconType} onClick={() => button.onClick(dispatch)}>
                    {button.title}
                </Button>
            </div>
            {children}
        </div>
    )
}

export default connect(({ app }) => ({ menu: app.menu }))(withRouter(PageHeader));