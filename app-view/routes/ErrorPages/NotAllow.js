import React from 'react';
import { bind } from 'app';
import Exception from 'ant-design-pro/lib/Exception';

class NotAllow extends React.Component {

    render() {
        return <Exception type="403" />
    }

}

export default bind(() => {}, {
    disableSubLayout: true
})(NotAllow);