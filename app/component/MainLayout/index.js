import React from 'react';
import { Layout } from 'antd';
import Header from './Header';
import Content from './Content';
import { Route } from 'dva/router';
const { Footer } = Layout;


export default ({ children, match }) => (
    <Layout style={{ height: '100%' }}>
        <Header url={match.url} />
        <Route path={`${match.url}/:bookId`} component={({ match }) => <Content children={children} match={match}/>}/>
        <Footer style={{ textAlign: 'center' }}>
            Copyright © 2000-2017 WxSoft ZhuHai Inc. All Rights Reserved
        </Footer>
    </Layout>
);

