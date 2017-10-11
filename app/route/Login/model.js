import delay from 'util/delay';
import request from 'util/request';
import sjcl from 'sjcl';
import { ENCRYPT_KEY } from 'constant';
import { routerRedux } from 'dva/router';

export default {
    namespace: 'app',
    state: {
        user: null,
        collapsed: false
    },
    effects: {
        *init() {
            yield delay(1000);
        },
        *login({ payload }, { call, put }) {
            const { data, err } = yield call(request,
                '/api/login',
                {
                    post: {
                        ...payload,
                        password: sjcl.encrypt(ENCRYPT_KEY, payload.password)
                    }
                });
            if (err) return;
            yield put({
                type: 'save',
                payload: {
                    user: data.user
                }
            });
            yield put(routerRedux.replace({
                pathname: '/'
            }))
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
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                if (pathname.match(/^\/login.*$/)) {
                    dispatch({ type: 'init' });
                }
            });
        },
    },
};