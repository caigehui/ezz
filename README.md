# Ezz

## Data Modeling

### **Company**

单树型文档+多节点文档 

|column name|type| isRequired | default value |  description|
|---|---|---|---|---|
|name| String| true ||公司全称，不允许重名|
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

单树形文档+多节点文档

### **User**

|column name|type| isRequired | default value |  description|
|---|---|---|---|---|
|username| String | true | |
|password| String| true |||
|name| String | true || 
|mobile|String|false||
|email|String|false||
|avatar| String | false |||
|createTime|Date|true|new Date||
|lastLoginTime|Date|true|||

### **Group**

|column name|type| isRequired | default value |  description|
|---|---|---|---|---|
|id| Number | true |  | role number auto increase |
|name| String| true ||role name|
|nickname| String | true || 
|avatar| String | false |||


### **Menu**

Tree Structure and Single Document

|column name|type|isRequired | default value |description|
|---|---|---|---|---|
|name| String | menu item name |
|key|String| router path key |
|children| [{ name: String, key: String, children: Array }] | submenus | 

### **Function**

Functions of menu items

One document for one menu item

|column name|type|isRequired | default value |description|
|---|---|---|--|--|
|key| String | key for a specific menu item  |
|functions|[{ name: String, key: String }]| functions of this item |

### **Privilege**

