import { routerRedux } from 'dva/router';
const { LOCATION_CHANGE } = routerRedux;
import Cookies from 'js-cookie';

const authenticationMiddleware = store => next => action => {
    if (action.type === LOCATION_CHANGE && action.payload.pathname !== '/login') {
        
        const { app, routing } = store.getState(); 
        if(!(Cookies.get('EGG_SESS') || app.user)) {
            // 校验身份
            return store.dispatch(routerRedux.replace({
                pathname: 'login'
            }))
        }else if(!routing.location) {
            // 初始化获取偏好设置
            store.dispatch({ type: 'app/init' }) 
        } 
	}
    next(action);

};

export default authenticationMiddleware;