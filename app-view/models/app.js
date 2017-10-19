import delay from 'utils/delay';
import request from 'utils/request';
import sjcl from 'sjcl';
import { ENCRYPT_KEY } from 'constant';
import { routerRedux } from 'app';

export default {
    namespace: 'app',
    persist: true,
    state: {
        user: null,
        collapsed: false,
        menu: []
    },
    effects: {
        *init() {
            yield delay(500);
            // 获取菜单数据
        },
        *login({ payload }, { call, put }) {
            // 登录
            const { data, err } = yield call(request,
                '/api/login',
                {
                    post: {
                        ...payload,
                        password: sjcl.encrypt(ENCRYPT_KEY, payload.password)
                    }
                });
            if (err) return;
            // 保存用户数据
            yield put({
                type: 'save',
                payload: {
                    user: data.user
                }
            });
            // 路由到首页
            yield put(routerRedux.replace({
                pathname: '/'
            }));
            // 初始化获取偏好设置
            yield put({ type: 'init' });
        }
    },
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
        toggleCollapsed(state) {
            return { ...state, collapsed: !state.collapsed };
        }
    }
};