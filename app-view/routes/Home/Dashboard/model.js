export default {
    namespace: 'dashboard',
    state: {
        files: []
    },
    effects: {
        
    },
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        }
    },
    subscriptions: {
        // setup({ dispatch, history }) {
        //     return history.listen(({ pathname }) => {
        //         if (pathname.match(/^\/login.*$/)) {
        //             dispatch({ type: 'init' });
        //         }
        //     });
        // },
    },
};