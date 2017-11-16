export default {
    namespace: 'modal',
    state: {

    },
    reducers: {
        open(state, action) {
            // 如果payload是对象，则展开对象
            if(typeof action.payload === 'object') return { ...state, ...action.payload };
            return { ...state, [action.payload]: true };
        },
        close(state,action) {
            return { ...state, [action.payload]: false };
        }
    },
};