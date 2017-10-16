# Ezz

## Data Modeling

### **Company**

公司：单树型文档+多节点文档 

|column name|type| isRequired | default value |  description|
|---|---|---|---|---|
|name| String| true ||公司全称，唯一，最顶级为集团公司名称|
|children|[{ name: String, children: Array }] |false ||子公司|
|code | String |false||公司代码|
|shortname| String | false ||公司简称| 
|legalPerson| String | false ||法人代表|
|phone|String|false||联系电话|
|address|String|false||地址|
|zipCode|String|false||邮政编码|
|email|String|false||邮箱|
|website|String|false||网站|

### **Department**

部门：单树形文档，以公司为单位

|column name|type| isRequired | default value |  description|
|---|---|---|---|---|
|name| String | true ||部门名称，不允许重名，如果是最顶级则为公司名称|
|users| Array | false | | 部门下的人员数组|
|user.id| ObjectId | false ||人员Id|
|users.name| String | false | |人员名字|
|users.roleName | String | false | | 角色名|
|children|[{ name: String, children: Array }] |false ||子部门|

### **Group**

工作组：单树形文档

|column name|type| isRequired | default value |  description|
|---|---|---|---|---|
|companyName| String | true ||工作组所属公司名称|
|groups|Array|false ||工作组|
|groups.name| String | true | | 工作组名称, 唯一 |
|groups.description | String | false | | 工作组描述 | 
|groups.members| [{ id: ObjectId, name: String }] | false || 人员 |
|groups.privileges|[ObjectId]|false||该工作组拥有的权限，可叠加|

### **Role**

角色（岗位）：与部门一对一

|column name|type| isRequired | default value |  description|
|---|---|---|---|---|
|departmentName| String | true ||角色所属|
|roles|Array|false ||部门拥有的角色|
|roles.name| String | true | | 角色名称, 唯一 |
|roles.description | String | false | | 角色描述 | 
|roles.privileges|[ObjectId]|false||该岗位拥有的权限，可叠加|
|roles.children | String | false | | 下级角色 |

### **User**

用户

|column name|type| isRequired | default value |  description|
|---|---|---|---|---|
|username| String | true | |
|password| String| true |||
|name| String | true || 
|mobile|String|true||
|email|String|false||
|avatar| String | false |||
|companies| [{ id: ObjectId, name: String, isMain: Boolean, privileges: [String] }] | true | |所属公司|
|createTime|Date|true|new Date||
|lastLoginTime|Date|true|||

### **Menu**

菜单：单树型文档

|column name|type|isRequired | default value |description|
|---|---|---|---|---|
|name| String|| | menu item 名称 |
|key|String||| router path key |
|functions|[{ id: String, name: String, description: String }]||| Item包含的功能，与权限对应 |
|children| [{ name: String, key: String, children: Array }] | ||submenus | 
