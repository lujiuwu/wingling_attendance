import { login } from '@/apis/login/index';
import { clockIn, clockOut } from '@/apis/clock';
import { getToken, setToken, removeToken } from '@/utils/auth';
import moment from 'moment';

const user = {
    namespaced: true,
    state: {
        token: getToken(),
        info: {
            _id: '',
            username: '',
            realname: '',
            password: '',
            avatar: '',
            isClockedIn: false,
            totalDuration: 0,
            targetTime: 0,
            grade: '',
            isAdmin: false
        },
        clock_info: {
            clockInTime: '',
            clockOutTime: ''
        }
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_USER_INFO: (state, userInfo) => {
            state.info = userInfo;
        },
        SET_IS_CLOCKEDIN: (state, isClockedIn) => {
            state.info.isClockedIn = isClockedIn;
        },
        SET_TOTAL_DURATION: (state, totalDuration) => {
            state.info.totalDuration = totalDuration;
        },
        SET_CLOCK_IN_TIME: (state, clockInTime) => {
            state.clock_info.clockInTime = clockInTime;
        },
        SET_CLOCK_OUT_TIME: (state, clockOutTime) => {
            state.clock_info.clockOutTime = clockOutTime;
        },
        SET_AVATAR: (state, avatar) => {
            console.log(avatar);
            state.info.avatar = `${process.env.VUE_APP_API_BASE_URL}${avatar}`;
        },
        CLEAR_CLOCKED_TIME(state) {
            state.clock_info.clockInTime = '';
            state.clock_info.clockOutTime = '';
        },
        CLEAR_USER(state) {
            state.token = '';
            state.info = {
                _id: '',
                username: '',
                realname: '',
                avatar: '',
                isClockedIn: false,
                totalDuration: 0,
                targetTime: 0,
                grade: '',
                isAdmin: false
            };
            state.clock_info = {
                clockInTime: '',
                clockOutTime: ''
            };
            removeToken();
        }
    },

    actions: {
        // 登录
        Login({ commit }, params) {
            return new Promise(async (resolve, reject) => {
                try {
                    const res = await login(params);
                    const { _token, ...userInfo } = res.data;
                    const modifiedUserInfo = {
                        ...userInfo,
                        avatar: `${process.env.VUE_APP_API_BASE_URL}${userInfo.avatar}`
                    };
                    setToken(_token);
                    commit('SET_TOKEN', _token);
                    commit('SET_USER_INFO', modifiedUserInfo);
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        },

        // 上卡
        ClockIn({ commit }, params) {
            return new Promise(async (resolve, reject) => {
                try {
                    const res = await clockIn(params);
                    const { isClockedIn } = res.data;
                    commit('SET_IS_CLOCKEDIN', isClockedIn);
                    commit('SET_CLOCK_IN_TIME', new Date().toLocaleTimeString());
                    commit('SET_CLOCK_OUT_TIME', '');
                    resolve();
                } catch (err) {
                    reject(err);
                }
            })
        },

        // 下卡
        ClockOut({ commit }, params) {
            return new Promise(async (resolve, reject) => {
                try {
                    const res = await clockOut(params);
                    const { isClockedIn, totalDuration } = res.data;
                    commit('SET_IS_CLOCKEDIN', isClockedIn);
                    commit('SET_TOTAL_DURATION', totalDuration);
                    commit('SET_CLOCK_OUT_TIME', new Date().toLocaleTimeString());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            })
        },

        // 退出登录
        Logout({ commit }) {
            commit('CLEAR_USER');
        }
    }
}

// 计算距离当天凌晨的时间戳
function getResidueTimestamp() {
    const now = moment().valueOf();
    const todayMidnight = moment().startOf('day').valueOf();
    const residue = todayMidnight + 24 * 60 * 60 * 1000 - now;
    return residue > 0 ? residue : 0;
}

setTimeout(() => {
    // 执行清空操作
    store.commit('CLEAR_CLOCKED_TIME');

    // 每天凌晨执行清空操作
    setInterval(() => {
        store.commit('CLEAR_CLOCKED_TIME');
    }, 24 * 60 * 60 * 1000);
}, getResidueTimestamp());

export default user;