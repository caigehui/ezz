db.menu.insert({
    name: '系统管理'
})


var companyId = ObjectId();

db.company.insert({
    _id: companyId,
    name: 'Ezz企业应用平台',
    shortname: 'Ezz'
})


var userId = ObjectId();

db.user.insert({
    _id: userId,
    username: 'admin',
    password: 'admin',
    name: 'admin',
    mobile: '13987654321',
    companies: [
        {
            id: companyId,
            name: 'Ezz企业应用平台',
            isMain: true,
            privileges: [

            ]
        }
    ]
});