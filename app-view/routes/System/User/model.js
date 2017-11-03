import request from 'utils/request';

export default {
    namespace: 'user',
    state: {
        users: [],
        count: 0,
        visible: false
    },
    effects: {
        * query({ payload: { pageSize, page } }, { call, put, select }) {
            const { data, err } = yield call(request, `/api/users?page=${page}&pagesize=${pageSize}`);
            if(err) return;
            yield put({
                type: 'save',
                payload: {
                    users: data.users.mapLocaleString(['lastLoginTime']),
                    count: data.count
                }
            })
        },
    },
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
        addUser(state) {
            return { ...state, visible: true }
        }
    },
};