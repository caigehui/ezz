'use strict';

module.exports = ({ mongoose }) => {
    const CompanySchema = new mongoose.Schema({
        name: { type: String, required: true },
        children: [{
            name: String,
            children: Array
        }],
        code: String,
        shortname: String,
        legalPerson: String,
        phone: String,
        address: String,
        zipCode: String,
        email: String,
        website: String
    }, { collection: 'company'});
    return mongoose.model('Company', CompanySchema);
};