import React from 'react';
import { bind } from 'app';
import { Uploader } from 'components';

function Dashboard({ dispatch, files }) {

    return (
        <div style={{height: '100%', backgroundColor: 'white'}}>
        </div>
    );
}

export default bind(({ home }) => ({ ...home }), { disableSubLayout: true })(Dashboard);