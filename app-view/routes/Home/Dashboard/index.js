import React from 'react';
import bind from 'bind';

function Dashboard() {

    return (
        <div style={{height: '100%', backgroundColor: 'white'}}>
        </div>
    );
}

export default bind(({ home }) => ({ ...home }), { disableSubLayout: true })(Dashboard);