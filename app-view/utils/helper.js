import request from './request';
import _ from 'lodash';
import moment from 'moment';

/**
 * 根据当前的path获取MenuItem，包括extraFunction
 * @param {array} menu 
 * @param {string} path 
 */
export function getBreadItemByKey(menu, path) {
    for (let i = 0; i < menu.length; i++) {
        if (menu[i].key === path) return menu[i];
        else if (menu[i].children && menu[i].children.length > 0) {
            const item = getBreadItemByKey(menu[i].children, path);
            if (item) return item;
        } else if (menu[i].extraFunctions && menu[i].extraFunctions.length > 0) {
            const item = getBreadItemByKey(menu[i].extraFunctions, path);
            if (item) return item;
        }
    }
}

/**
 * 根据当前的path获取MenuItem，如果path是extraFunction的key，那么获取的item是它的MenuItem
 * @param {array} menu 
 * @param {string} path 
 */
export function getMenuItemByKey(menu, path) {
    for (let i = 0; i < menu.length; i++) {
        if (menu[i].hidden) continue;
        if (menu[i].key === path) return menu[i];
        else if (menu[i].children && menu[i].children.length > 0) {
            const item = getMenuItemByKey(menu[i].children, path);
            if (item) return item;
        } else if (menu[i].extraFunctions && menu[i].extraFunctions.length > 0) {
            const item = getMenuItemByKey(menu[i].extraFunctions, path);
            if (item) return menu[i];
        }
    }
}

/**
 * 检查权限
 * @param {array} privileges 
 * @param {string} key 
 */
export function checkAuth(privileges, key) {
    return privileges.find(i => i === key)
}

/**
 * 将数据库的UTC时间转换成本地时间
 * @param {array} arr 
 * @param {string} keys
 */
export function mapLocaleString(arr, keys) {
    if (!keys) {
        for (let i of arr) {
            if (!moment(i).isValid()) continue;
            i = moment(i).format('YYYY-MM-DD HH:mm:ss');
        }
    } else if (typeof (keys) === 'string') {
        for (let i of arr) {
            if (!_.get(i, keys) || !moment(_.get(i, keys)).isValid()) continue;
            _.set(i, keys, moment(_.get(i, keys)).format('YYYY-MM-DD HH:mm:ss'));
        }
    } else if (keys instanceof Array) {
        for (let i of arr) {
            for (let key of keys) {
                if (!_.get(i, key) || !moment(_.get(i, key)).isValid()) continue;
                _.set(i, key, moment(_.get(i, key)).format('YYYY-MM-DD HH:mm:ss'));
            }
        }
    }
    return arr;
}

// form校验函数
async function validator({value, callback, from, name, field}) {
    const { data } = await request('/api/verify', { post: { model: from, field, value } });
    if (data.exist) callback(`${name}已重复，请重新输入`);
    callback();
}

// 1.5秒内最多调用一次
const throttleValidator = _.throttle(validator, 1500, { leading: false })

/**
 * 验证字段是否已存在
 * @param {object} options  
 */
export function unique(options) {
    return (rule, value, callback) => {
        throttleValidator({rule, value, callback, ...options});
    }
}