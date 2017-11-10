import request from 'utils/request';
import { mapLocaleString } from 'utils/helper';

export default {
    namespace: 'user',
    state: {
        list: [],
        count: 0
    },
    effects: {
        * query({ payload: { pageSize, page } }, { call, put, select }) {
            const { data, err } = yield call(request, `/api/users?page=${page}&pagesize=${pageSize}`);
            if(err) return;
            yield put({
                type: 'save',
                payload: {
                    list: mapLocaleString(data.list, ['lastLoginTime']),
                    count: data.count
                }
            })
        },
        * create({ payload: { username, mobile, name, password } }, { call, put }) {
            const { data, err } = yield call(request, '/api/users', { post: {
                username,
                password,
                info: {
                    name,
                    mobile
                },
                role: {
                    name: '系统管理员',
                    rolePrivileges: ['1']
                }
            } });
            return err;
        }
    },
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
        toggleModal(state) {
            return { ...state, visible: !state.visible }
        }
    },
};