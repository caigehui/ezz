export default {
    namespace: 'modal',
    state: {

    },
    reducers: {
        open(state, action) {
            return { ...state, [action.payload]: true }
        },
        close(state,action) {
            return { ...state, [action.payload]: false }
        }
    },
};