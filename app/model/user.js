'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const UserSchema = new mongoose.Schema({
        username: { type: String, required: true },
        password: { type: String, required: true },
        nickname: { type: String, required: true },
        avatar: { type: mongoose.Schema.Types.ObjectId }
    });

    return mongoose.model('User', UserSchema);
};
