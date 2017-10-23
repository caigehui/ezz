import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

function ErrorHandler({ title, handler }) {
    return (
        <div className={styles.container}>
            <h1>{title}</h1>
            {handler}
        </div>
    )
}

export default ErrorHandler 