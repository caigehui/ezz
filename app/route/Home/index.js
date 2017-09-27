import React from 'react';
import { connect } from 'dva';
import { MainLayout } from '../../component';

function Home({ match }) {
    return (
        <MainLayout match={match}>
            {match.url}
        </MainLayout>
    );
}

export default connect()(Home);