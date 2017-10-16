'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const MenuSchema = new mongoose.Schema({
        name: { type: String, required: true },
        key: { type: String, required: true },
        functions: [{
            id: String,
            name: String,
            description: String
        }],
        children: [{
            name: String,
            key: String,
            functions: Array,
            children: Array
        }]
    }, { collection: 'menu'});
    return mongoose.model('Menu', MenuSchema);
};