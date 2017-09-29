'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const FileSchema = new mongoose.Schema({
        filename: { type: String, required: true },
        filetype: { type: String, enum: ['image', 'file'], required: true },
        filesize: { type: Number, required: true },
        temp: { type: Boolean, default: true },
        thumbHash: String,
        mediumHash: String,
        hash: { type: String, required: true }
    });

    return mongoose.model('File', FileSchema);
};