// axios的基础封装
import router from "@/router";
import axios from "axios";
import showNotice from "./notice";
import { Loading } from 'element-ui';

// 创建一个axios实例，可以配置通用的请求参数，如baseURL、headers等
const instance = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// 配置请求拦截器
let loadingInstance = null;
instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('TOKEN_KEY');
        if (token) {
            config.headers.Authorization = token;
        }
        loadingInstance = Loading.service({
            fullscreen: true
        });
        return config;
    },
    err => {
        loadingInstance.close();
        return Promise.reject(err);
    }
);

instance.interceptors.response.use(
    res => {
        loadingInstance.close();
        return res.data;
    },
    err => {
        if (err.response) {
            showNotice('error', '错误', err.response.data.msg);

            // 401 token失效处理
            // 1. 清除本地用户数据
            // 2. 如果当前页面不是登录页面，跳转页面
            if (err.response.status === 401) {
                localStorage.clear();
                if (router.currentRoute.path !== '/login') {
                    router.push('/login');
                }
            } else if (err.response.status === 500) {
                showNotice('error', '错误', '服务器端错误，请稍后再试');
            }
        } else {
            showNotice('error', '错误', '网络错误，请稍后再试');
        }
        loadingInstance.close();
        return Promise.reject(err);
    }
);

export default instance;