import React from 'react';
import { connect } from 'dva';
import { MainLayout } from 'component';

function Home({ match }) {
    return (
        <MainLayout match={match}>
            <form method="POST" action="/api/files" encType="multipart/form-data">
                title: <input name="title" />
                file: <input name="file" type="file" />
                <button type="submit">Upload</button>
            </form>
        </MainLayout>
    );
}

export default connect()(Home);