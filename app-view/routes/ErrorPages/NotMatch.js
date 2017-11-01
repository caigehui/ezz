import React from 'react';
import { bind, Link } from 'app';
import Exception from 'ant-design-pro/lib/Exception';

function NotMatch() {
    return <Exception type="404" />
}

export default bind(() => {}, {
    disableSubLayout: true
})(NotMatch);