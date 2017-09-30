'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const FileSchema = new mongoose.Schema({
        filenames: [String],
        filesize: { type: Number, required: true },
        hash: { type: String, required: true },
        temp: { type: Boolean, default: true }
    });

    return mongoose.model('File', FileSchema);
};