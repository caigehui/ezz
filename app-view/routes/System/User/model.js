import request from 'utils/request';
import { mapLocaleString } from 'utils/helper';

export default {
    namespace: 'user',
    state: {
        users: [],
        count: 0,
        visible: false,
        err: null
    },
    effects: {
        * query({ payload: { pageSize, page } }, { call, put, select }) {
            const { data, err } = yield call(request, `/api/users?page=${page}&pagesize=${pageSize}`);
            if(err) return;
            yield put({
                type: 'save',
                payload: {
                    users: mapLocaleString(data.users, ['lastLoginTime']),
                    count: data.count
                }
            })
        },
        * create({ payload }, { call, put }) {
            const { data, err } = yield call(request, '/api/users', { post: {
                ...payload,
                role: {
                    name: '系统管理员',
                    rolePrivileges: ['1']
                }
            } });
            if(err) {
                yield put({
                    type: 'save',
                    payload: { err }
                })
                return false;
            } else {
                return true;
            }
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