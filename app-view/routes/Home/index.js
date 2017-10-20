import React from 'react';
import { bind } from 'app';
import { Uploader } from 'components';

function Home({ dispatch, files }) {

    return (
        <Uploader files={files} onChange={files => dispatch({ type: 'home/save', payload: { files } })}/>
    );
}

export default bind(({ home }) => ({ ...home }))(Home);