import delay from '../../util/delay';

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