/* 路由器对象模块 */
import Vue from "vue";
import VueRouter from "vue-router";
import Login from '@/views/Login/index';
import Msite from '@/views/Msite/index.vue';
import Profile from '@/views/Profile/index.vue';
import Statistics from '@/views/Statistics/index.vue';
import Application from '@/views/Application/index.vue';
import DetailedProfile from '@/views/Profile/DetailedProfile/index.vue';
import store from '@/store/index';
import showNotice from "@/utils/notice";

// 声明使用插件
Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    // 所有路由
    routes: [
        {
            path: '/msite',
            component: Msite,
            meta: {
                hideFooterGuide: false,
                requiresAuth: true
            }
        },
        {
            path: '/profile',
            component: Profile,
            meta: {
                hideFooterGuide: false,
                requiresAuth: true
            }
        },
        {
            path: '/settings',
            component: DetailedProfile,
            meta: {
                hideFooterGuide: true,
                requiresAuth: true
            }
        },
        {
            path: '/statistics',
            component: Statistics,
            meta: {
                hideFooterGuide: false,
                requiresAuth: true
            }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                hideFooterGuide: true
            }
        },
        {
            path: '/',
            redirect: '/msite',
            meta: {
                hideFooterGuide: false,
                requiresAuth: true
            }
        },
        {
            path: '/application',
            component: Application,
            meta: {
                hideFooterGuide: true,
                requiresAuth: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        if (store.getters.token) {
            next();
        } else {
            showNotice('error', '无权限，请先登录');
            return next('/login');
        }
    } else {
        next();
    }
})

console.log(store.getters.token);

export default router;