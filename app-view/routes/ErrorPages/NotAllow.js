import React from 'react';
import bind from 'bind';
import { Exception } from 'components';

class NotAllow extends React.Component {

    render() {
        return <Exception type="403" />
    }

}

export default bind({ disableSubLayout: true })(NotAllow);