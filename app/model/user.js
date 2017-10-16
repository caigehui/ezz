'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const UserSchema = new mongoose.Schema({
        username: { type: String, required: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        mobile: { type: String, required: true },
        email: String,
        avatar: String,
        privileges: [String],
        createTime: { type: Date, default: Date.now },
        lastLoginTime: Date
    }, { collection: 'user'});

    return mongoose.model('User', UserSchema);
};
