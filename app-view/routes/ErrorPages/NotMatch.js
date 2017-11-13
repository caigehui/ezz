import React from 'react';
import bind from 'bind';
import { Exception } from 'components';

function NotMatch() {
    return <Exception type="404" />;
}

export default bind({
    disableSubLayout: true
})(NotMatch);