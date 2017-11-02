import request from 'utils/request';

export default {
    namespace: 'user',
    state: {
        users: []
    },
    effects: {
        * init(action = {}, { call, put }) {
            const { data, err } = yield call(request, `/api/users`);
            yield put({
                type: 'save',
                payload: {
                    users: data
                }
            })
        },
        * query({ page }, {  }) {

        }
    },
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        }
    },
};