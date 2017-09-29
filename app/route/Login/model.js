import delay from 'util/delay';
import request from 'util/request';
import sjcl from 'sjcl';
import { ENCRYPT_KEY } from 'constant';

export default {
    namespace: 'app',
    state: {
        user: null
    },
    effects: {
        *init() {
            yield delay(1000)
        },
        *login({ payload }, { call, put, select }) {
            const { data, error } = yield call(request,
                '/api/login',
                {
                    post: {
                        ...payload,
                        password: sjcl.encrypt(ENCRYPT_KEY, payload.password)
                    }
                });
            if (error) return;
            yield put({
                type: 'save',
                payload: {
                    user: data.user
                }
            })
        }
    },
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload }
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
}