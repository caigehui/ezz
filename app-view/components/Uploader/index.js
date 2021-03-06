import React from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import { Upload, Button, Icon, message } from 'antd';
import request from 'utils/request';
import SparkMD5 from 'spark-md5';

const MD5_VERIFY_API = '/api/files/verify';

export default class Uploader extends React.Component {

    static propTypes = {
        files: PropTypes.array,
        onChange: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            fileList: []
        };
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
            };

            loadNext();
        });
    }

    beforeUpload = (file) => {
        return new Promise((resolve, reject) => {
            this.getHash(file).then(hash => {
                request(MD5_VERIFY_API, {
                    post: {
                        hash,
                        filename: file.name
                    }
                }).then(({ data: { fileId, url } }) => {
                    if (fileId) {
                        message.success(`${file.name} 成功秒传`);
                        this.props.onChange && this.props.onChange([...this.props.files, { uid: file.uid,filename: file.name , url, fileId }]);
                        file.url = url;
                        this.setState({ fileList: [...this.state.fileList, file] });
                        reject('秒传');
                    } else {
                        resolve();
                    }
                });
            });
        });
    }

    onChange = ({ file, fileList }) => {
        if (file.status === 'done') {
            message.success(`${file.name} 成功上传`);
            this.props.onChange && this.props.onChange([...this.props.files, { uid: file.uid, filename: file.name, url: file.response.url, fileId: file.response.fileId }]);
            let doneFile = fileList.find(i => i.uid === file.uid);
            doneFile.url = file.response.url;
        } else if (file.status === 'error') {
            message.error(`${file.name} 上传失败`);
        }
        this.setState({ fileList });
    }

    onRemove = file => {
        this.setState({
            fileList: this.state.fileList.removeByCondition(i => i.uid === file.uid)
        });
        this.props.onChange && this.props.onChange(this.props.files.removeByCondition(i => i.uid === file.uid));
    }

    shouldComponentUpdate(nextProps) {
        if(nextProps.files.length !== this.props.files.length) return false;
        return true;
    }

    render() {
        return (
            <Upload
                name="file"
                action="/api/files"
                headers={{ 'x-csrf-token': Cookies.get('csrfToken') }}
                withCredentials
                fileList={this.state.fileList}
                onChange={this.onChange}
                beforeUpload={this.beforeUpload}
                onRemove={this.onRemove}>
                <Button>
                    <Icon type="upload" />上传
                </Button>
            </Upload>
        );
    }
} 