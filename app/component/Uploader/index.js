import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { Upload, Button, Icon, message } from 'antd';
import request from 'util/request';
import SparkMD5 from 'spark-md5';

const MD5_VERIFY_API = '/api/files/verify';

const options = {
    name: 'file',
    action: '/api/files',
    headers: {
        'x-csrf-token': Cookies.get('csrfToken')
    },
    withCredentials: true
};

export default class Uploader extends React.Component {

    static propTypes = {
        files: PropTypes.array,
        onChange: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            fileList: []
        }
    }

    /**
     * 获取hash值
     */
    getHash = file => {
        return new Promise(resolve => {
            let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
                chunkSize = 2097152,
                chunks = Math.ceil(file.size / chunkSize),
                currentChunk = 0,
                spark = new SparkMD5.ArrayBuffer(),
                fileReader = new FileReader();

            fileReader.onload = e => {
                spark.append(e.target.result);
                currentChunk++;
                if (currentChunk < chunks) {
                    loadNext();
                } else {
                    const hash = spark.end();
                    resolve(hash);
                }
            };
            const loadNext = () => {
                let start = currentChunk * chunkSize,
                    end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

                fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
            }

            loadNext();
        });
    }

    beforeUpload = (file) => {
        return new Promise((resolve, reject) => {
            // this.getHash(file).then(hash => {
            //     request(MD5_VERIFY_API, {
            //         post: {
            //             hash,
            //             filename: file.name
            //         }
            //     }).then(({ url, fileId }) => {
            //         if (fileId) {
            //             message.success(`${file.name} 成功秒传`);
            //             this.props.onChange && this.props.onChange([...this.props.files, { uid: file.uid, url, fileId }]);
            //             this.setState({ fileList: [...this.state.fileList, file] });
            //             reject('已秒传');
            //         } else {
            //             resolve();
            //         }
            //     })
            // });
            resolve();
        })
    }

    onChange = ({ file, fileList }) => {
        console.log('onChange', fileList);
        this.setState({ fileList });
        if (file.status === 'done') {
            message.success(`${file.name} 成功上传`);
            this.props.onChange && this.props.onChange([...this.props.files, { uid: file.uid, url: file.response.url, fileId: file.response.fileId }]);
        } else if (file.status === 'error') {
            message.error(`${file.name} 上传失败`);
        }
    }

    onRemove = file => {
        console.log('onRemove!');
        this.setState({
            fileList: this.state.fileList.removeByCondition(i => i.uid === file.uid)
        });
        this.props.onChange && this.props.onChange(this.props.files.removeByCondition(i => i.uid === file.uid));
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldChange', nextState);
        if(nextProps.files.length !== this.props.files.length) return false;
        return true;
    }

    render() {
        console.log('render', this.state.fileList);
        return (
            <Upload
                name="file"
                action="/api/files"
                headers={{ 'x-csrf-token': Cookies.get('csrfToken') }}
                withCredentials
                fileList={this.state.fileList}
                onChange={this.onChange}
                beforeUpload={this.beforeUpload}>
                <Button>
                    <Icon type="upload" />上传
                </Button>
            </Upload>
        )
    }
} 