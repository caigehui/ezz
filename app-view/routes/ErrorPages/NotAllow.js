import React from 'react';
import { bind } from 'app';
import { ErrorHandler } from 'components';

class NotAllow extends React.Component {

    render() {
        return <ErrorHandler title="对不起，您无权使用该模块" 
        handler={<p>请尝试联系您的管理员</p>}/>
    }

}


export default bind()(NotAllow);