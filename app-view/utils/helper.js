/**
 * 根据当前的path获取MenuItem，包括extraFunction
 * @param {array} menu 
 * @param {string} path 
 */
export function getBreadItemByKey(menu, path) {
    for(let i = 0; i < menu.length; i++) {
        if(menu[i].key === path) return menu[i];
        else if(menu[i].children && menu[i].children.length > 0) {
            const item = getBreadItemByKey(menu[i].children, path);
            if(item) return item;
        } else if(menu[i].extraFunctions && menu[i].extraFunctions.length > 0) {
            const item = getBreadItemByKey(menu[i].extraFunctions, path);
            if(item) return item;
        }  
    }
}

/**
 * 根据当前的path获取MenuItem，如果path是extraFunction的key，那么获取的item是它的MenuItem
 * @param {array} menu 
 * @param {string} path 
 */
export function getMenuItemByKey(menu, path) {
    for(let i = 0; i < menu.length; i++) {
        if(menu[i].hidden) continue;
        if(menu[i].key === path) return menu[i];
        else if(menu[i].children && menu[i].children.length > 0) {
            const item = getMenuItemByKey(menu[i].children, path);
            if(item) return item;
        } else if(menu[i].extraFunctions && menu[i].extraFunctions.length > 0) {
            const item = getMenuItemByKey(menu[i].extraFunctions, path);
            if(item) return menu[i];
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