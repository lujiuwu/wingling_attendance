import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import SecureLS from "secure-ls";
import user from './modules/user';
import getters from './getter';

const ls = new SecureLS({ isCompression: false });

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user
    },
    getters,
    plugins: [createPersistedState({
        storage: {
            getItem: (key) => ls.get(key),
            setItem: (key, value) => ls.set(key, value),
            removeItem: (key) => ls.remove(key)
        }
    })]
});

export default store;