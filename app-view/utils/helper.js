/**
 * 获取MenuItem
 * @param {array} menu 
 * @param {string} path 
 */
export function getMenuItemByKey(menu, path, father) {
    for(let i = 0; i < menu.length; i++) {
        if(menu[i].key === path) return menu[i];
        else if(menu[i].children && menu[i].children.length > 0) {
            const item = getMenuItemByKey(menu[i].children, path, menu[i]);
            if(item) return item;
        } else if(menu[i].extraFunctions && menu[i].extraFunctions.length > 0) {
            const item = getMenuItemByKey(menu[i].extraFunctions, path, menu[i]);
            if(item) return father;
        }  
    }
}

/**
 * 检查权限
 * @param {array} privileges 
 * @param {string} key 
 */
export function checkAuth(privileges, key) {
    return privileges.find(i => i === key || i === '1')
}