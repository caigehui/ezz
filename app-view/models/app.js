import delay from 'utils/delay';
import request from 'utils/request';
import sjcl from 'sjcl';
import { ENCRYPT_KEY } from 'constant';
import { routerRedux } from 'dva/router';
import enquire from 'enquire.js';
import Cookies from 'js-cookie';

const getInitState = () => ({
    // 用户数据
    user: null,
    // 用户的菜单功能权限
    privileges: [],
    // 是否打开移动端的菜单
    openMobileMenu: false,
    // 菜单是否收起
    collapsed: false,
    // 打开的Menu
    openKeys: [],
    // 每个Menu选择的Funtion
    functionPathForMenu: {},
    // 全部菜单dataSource
    menu: [],
    // 是否为手机
    isMobile: document.documentElement.clientWidth <= 767
});
export default {
    namespace: 'app',
    persist: true,
    state: getInitState(),
    subscriptions: {
        setup({ dispatch }) {
            enquire.register('only screen and (min-width: 320px) and (max-width: 767px)', {
                match: () => {
                    dispatch({ type: 'changeToMobile' });
                },
                unmatch: () => {
                    dispatch({ type: 'changeToDesktop' });
                },
            });
        }
    },
    effects: {
        // app 初始化，启动应用时的入口
        *init(action = {}, { call, put }) {
            yield delay(500);
            // 应用启动时调用signin来获取最新的用户数据
            const { data, err } = yield call(request, '/api/signin', { post: {} });
            if (err) return;
            yield put({
                type: 'save',
                payload: {
                    user: data.user,
                    menu: data.menu,
                    // 整合权限，并去重
                    privileges: Array.from(new Set([...data.user.role.rolePrivileges, ...data.user.currentCompany.jobPrivileges, ...data.user.currentCompany.userPrivileges]))
                }
            })
        },
        *login({ payload }, { call, put }) {
            // 登录
            const { data, err } = yield call(request,
                '/api/login',
                {
                    post: {
                        ...payload,
                        // sjcl加密
                        password: sjcl.encrypt(ENCRYPT_KEY, payload.password)
                    }
                });
            if (err) return err;
            // 初始化获取偏好设置
            yield put({ type: 'init' });
            yield delay(500);
            // 路由到首页
            yield put(routerRedux.replace({
                pathname: '/'
            }));
            return false;
        },
        *logout(action = {}, { call, put }) {
            const { data, err } = yield call(request, '/api/signin', { post: {} });
            yield put(routerRedux.replace({
                pathname: '/login'
            }));
            yield put({
                type: 'save',
                payload: getInitState()
            })
            // 清除Cookies
            Cookies.set('EGG_SESS', null);
        }
    },
    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
        toggleCollapsed(state) {
            return { ...state, collapsed: !state.collapsed };
        },
        toggleMobileMenu(state) {
            return { ...state, openMobileMenu: !state.openMobileMenu };
        },
        changeToMobile(state, action) {
            if (state.isMobile) return state;
            return { ...state, isMobile: true };
        },
        changeToDesktop(state, action) {
            if (!state.isMobile) return state;
            return { ...state, isMobile: false };
        },
        resetFunctionPathForMenu(state, action) {
            return {
                ...state,
                functionPathForMenu: {
                    ...state.functionPathForMenu,
                    [action.payload]: action.payload
                }
            }
        }
    }
};