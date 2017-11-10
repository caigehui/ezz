export default {
    namespace: 'modal',
    state: {

    },
    reducers: {
        open(state, action) {
            if(typeof action.payload === 'object') return { ...state, ...action.payload }
            return { ...state, [action.payload]: true }
        },
        close(state,action) {
            return { ...state, [action.payload]: false }
        }
    },
};