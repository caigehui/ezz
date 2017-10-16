'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const FileSchema = new mongoose.Schema({
        // 文件名
        filename: { type: String, required: true },
        // 文件大小
        filesize: { type: Number, required: true },
        // 是否为临时文件，定期删除临时文件
        temp: { type: Boolean, default: true },
        // 原图hash
        hash: { type: String, required: true }
    },{ collection: 'file'});
    return mongoose.model('File', FileSchema);
};