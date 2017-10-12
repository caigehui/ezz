'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const UserSchema = new mongoose.Schema({
        username: { type: String, required: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        avatar: String
    });

    return mongoose.model('User', UserSchema);
};
