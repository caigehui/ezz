import React from 'react';
import { Alert } from 'antd';

export default function ErrorMessage({ err }) {
    return err ? <Alert
        style={{ marginBottom: 24 }}
        message={err}
        type="error"
        showIcon
    /> : null
}