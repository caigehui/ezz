'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const UserSchema = new mongoose.Schema({
        username: String,
        password: String
    });

    return mongoose.model('User', UserSchema);
}
