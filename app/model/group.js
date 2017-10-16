'use strict';

module.exports = ({ mongoose }) => {
    const GroupSchema = new mongoose.Schema({
        companyName: { type: String, required: true },
        groups: [{
            name: String,
            description: String,
            members: [{
                id: mongoose.Schema.Types.ObjectId,
                name: String
            }],
            privileges: [String]
        }]
    },{ collection: 'group'});
    return mongoose.model('Group', GroupSchema);
};