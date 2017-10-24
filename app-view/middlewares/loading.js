import NProgress from 'nprogress';
const DVA_LOADING_SHOW = '@@DVA_LOADING/SHOW';
const DVA_LOADING_HIDE = '@@DVA_LOADING/HIDE'; 

const loadingMiddleware = store => next => action => {
    if(action.type === DVA_LOADING_SHOW) {
        !NProgress.isStarted() && NProgress.start();
    }
    if(action.type === DVA_LOADING_HIDE) {
        NProgress.isStarted() && NProgress.done();
    }
	next(action);
};

export default loadingMiddleware;