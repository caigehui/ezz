import { routerRedux } from 'dva/router';
const { LOCATION_CHANGE } = routerRedux;
import Cookies from 'js-cookie';
import { checkAuth, getMenuItemByKey } from 'utils/helper';

/**
 * 身份验证的中间件，如果被清除cookies和缓存，直接跳转到登录页
 * 应用启动时，执行app/init的effects
 */
const authenticationMiddleware = store => next => action => {
    if (action.type === LOCATION_CHANGE && action.payload.pathname !== '/login') {

        const { app, routing } = store.getState();
        if (!(Cookies.get('EGG_SESS') || app.user)) {
            // 校验身份
            return store.dispatch(routerRedux.replace({
                pathname: '/login'
            }));
        } else if (!routing.location) {
            // 初始化获取偏好设置
            store.dispatch({ type: 'app/init' });
        }
        // 检查菜单访问的权限
        const item = getMenuItemByKey(app.menu, action.payload.pathname);
        if (item && !checkAuth(app.privileges, action.payload.pathname)) {
            store.dispatch({ type: 'app/resetFunctionPathForMenu', payload: item.key });
            return store.dispatch(routerRedux.replace({
                pathname: '/notallow'
            }));
        }
    }
    next(action);

};

export default authenticationMiddleware;