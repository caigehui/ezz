import React from 'react';
import { bind } from 'app';
import QueueAnim from 'rc-queue-anim';
function Role({ }) {

    return (
        <QueueAnim>
            <div key="1">enter in queue</div>
            <div key="2">enter in queue</div>
            <div key="3">enter in queue</div>
        </QueueAnim>
    );
}

export default bind()(Role);