import React from 'react';
import { connect } from 'dva';
import { MainLayout, Uploader } from 'component';


function Home({ match, dispatch, files }) {

    return (
        <MainLayout match={match}>
            <Uploader files={files} onChange={files => dispatch({ type: 'home/save', payload: { files } })}/>
        </MainLayout>
    );
}

export default connect(({ home }) => ({ ...home }))(Home);