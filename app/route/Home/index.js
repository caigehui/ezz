import React from 'react';
import { connect } from 'dva';
import { MainLayout } from 'component';
import Cookies from 'js-cookie';
import { Upload, Button, Icon, message } from 'antd';

const props = {
    name: 'file',
    action: '/api/files',
    headers: {
        'x-csrf-token': Cookies.get('csrfToken')
    },
    withCredentials: true,
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    data: function(file) {
        console.log(file);
        return {
            file: 's'
        }
    }
};

function Home({ match }) {
    return (
        <MainLayout match={match}>
            <Upload {...props}>
                <Button>
                    <Icon type="upload" /> Click to Upload
                </Button>
            </Upload>
        </MainLayout>
    );
}

export default connect()(Home);