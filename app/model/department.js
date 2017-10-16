'use strict';

module.exports = ({ mongoose }) => {
    const DepartmentSchema = new mongoose.Schema({
        name: { type: String, required: true },
        users: [{
            id: mongoose.Schema.Types.ObjectId,
            name: String,
            roleName: String
        }],
        children: [{
            name: String,
            children: Array
        }]
    },{ collection: 'department'});
    return mongoose.model('Department', DepartmentSchema);
};