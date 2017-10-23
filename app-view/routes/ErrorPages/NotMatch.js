import React from 'react';
import { bind, Link } from 'app';
import { ErrorHandler } from 'components';

function NotMatch() {
    return <ErrorHandler title="您请求的页面并不存在" 
    handler={<p>请重新载入页面。如果问题依然存在，<Link to="/">请向我们反馈</Link></p>}/>
}

export default bind()(NotMatch);