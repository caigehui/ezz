import React from 'react';
import bind from 'bind';
import { Uploader } from 'components';

function Dashboard({ dispatch, files }) {

    return (
        <div style={{height: '100%', backgroundColor: 'white'}}>
        </div>
    );
}

export default bind(({ home }) => ({ ...home }), { disableSubLayout: true })(Dashboard);