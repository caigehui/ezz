export default {
    namespace: 'person',
    state: {
        info: null    
    },
    effects: {
        * init(action = {}, { put, select }) {
            const { info } = yield select(({ app }) => app.user);
            yield put({
                type: 'save',
                payload: {
                    info
                }
            });
        }
    },
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        }
    },
};