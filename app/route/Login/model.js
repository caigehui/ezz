import delay from 'util/delay';
import request from 'util/request';
import sjcl from 'sjcl';
import { ENCRYPT_KEY } from 'constant';
import { routerRedux } from 'dva/router';

export default {
    namespace: 'app',
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
    },
    // subscriptions: {
    //     setup({ dispatch, history }) {
    //         return history.listen(({ pathname }) => {
    //             if (pathname.match(/^\/login.*$/)) {
    //                 dispatch({ type: 'init' });
    //             }
    //         });
    //     },
    // },
};