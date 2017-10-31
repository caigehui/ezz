import React from 'react';
import { bind } from 'app';
import { } from 'antd';
import styles from './index.less';

function Person({ info, dispatch, match }) {
    if(!info) return null;
    return (
        <div className={styles.container}>
            <div className={styles.profileWrapper}>
                <div className={styles.profileHeader}>
                    <img className={styles.cover} src={info.cover||require('assets/bg.jpg')}/>
                </div>
            </div>
        </div>
    )
}

export default bind(({ person }) => ({ ...person }), { disableSubLayout: true })(Person);