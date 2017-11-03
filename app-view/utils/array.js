import _ from 'lodash';

/**
 * 将数据库的UTC时间转换成本地时间
 */
Array.prototype.mapLocaleString = function(keys) {
    if(!keys) {
        for(let i of this) {
            i = (new Date(i)).toLocaleString();
        }
    } else if(typeof(keys) === 'string') {
        for(let i of this) {
            _.set(i, keys, (new Date(_.get(i, keys))).toLocaleString()); 
        }
    } else if(keys instanceof Array) {
        for(let i of this) {
            for(let key of keys) {
                _.set(i, key, (new Date(_.get(i, key))).toLocaleString()); 
            }
        }
    }
    return this;
}

/**
 * 返回移除后的数组，不更改原数组
 * @param {function} condition 
 */
Array.prototype.removeByCondition = function (condition) {
    let temp = [];
    for (let i of this) {
        if (condition(i)) continue;
        temp.push(i);
    }
    return temp;
};

/**
 * 返回第一个满足条件的元素
 * @param {function} condition 
 */
Array.prototype.findByCondition = function (condition) {
    for (let i of this) {
        if (condition(i)) return i;
    }
    return null;
};

/**
 * 如果满足条件，返回true, 否则false
 * @param {*} condition 
 */
Array.prototype.searchByCondition = function (condition) {
    for (let i of this) {
        if (condition(i)) return true;
    }
    return false;
};

/**
 * 移除一个或者多个对象
 */
Array.prototype.removeObjects = function (...objects) {
    if (!objects) return this;
    let temp = [];
    for (let i of this) {
        let add = true;
        for (let o of objects) {
            if (compareObject(i, o)) add = false;
        }
        if (add) temp.push(i);
    }
    return temp;
};

/**
 * 比较两个对象是否相同
 * @param {object} x 
 * @param {object} y 
 */
function compareObject(x, y) {
    if (x === y) {
        return true;
    }
    if (!(x instanceof Object) || !(y instanceof Object)) {
        return false;
    }
    if (x.constructor !== y.constructor) {
        return false;
    }
    for (let p in x) {
        if (x.hasOwnProperty(p)) {
            if (!y.hasOwnProperty(p)) {
                return false;
            }
            if (x[p] === y[p]) {
                continue;
            } 
            if (typeof (x[p]) !== 'object') {
                return false;
            }
            if (!Object.equals(x[p], y[p])) {
                return false;
            }
        }
    }
    for (let r in y) {
        if (y.hasOwnProperty(r) && !x.hasOwnProperty(r)) {
            return false;
        }
    }
    return true;
}
