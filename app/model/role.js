'use strict';

module.exports = ({ mongoose }) => {
    const RoleSchema = new mongoose.Schema({
        departmentName: { type: String, required: true },
        groups: [{
            name: String,
            description: String,
            members: [{
                id: mongoose.Schema.Types.ObjectId,
                name: String
            }],
            privileges: [String]
        }]
    }, { collection: 'role'});
    return mongoose.model('Role', RoleSchema);
};