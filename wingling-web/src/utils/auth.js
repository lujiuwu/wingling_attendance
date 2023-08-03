import { AES_CBC_ENCRYPT, AES_CBC_DECRYPT } from '@/utils/crypto';

// 获取token
export const getToken = () => {
    return localStorage.getItem('TOKEN_KEY');
};

// 设置token
export const setToken = (token) => {
    localStorage.setItem('TOKEN_KEY', token);
};

// 删除token
export const removeToken = () => {
    localStorage.removeItem('TOKEN_KEY');
};

// 本地缓存登录信息
export const saveLoginInfo = (params) => {
    const secretKey = process.env.VUE_APP_SECRET_KEY;
    const encryptedParams = AES_CBC_ENCRYPT(JSON.stringify(params), secretKey);
    localStorage.setItem('LOGIN_INFO', encryptedParams);
};

// 获取本地缓存的登录信息
export const getLoginInfo = () => {
    if (!localStorage.getItem('LOGIN_INFO')) return;
    const secretKey = process.env.VUE_APP_SECRET_KEY;
    const decryptedParams = AES_CBC_DECRYPT(localStorage.getItem('LOGIN_INFO'), secretKey);
    return JSON.parse(decryptedParams);
};

// 清除本地保存的登录信息
export const clearLoginInfo = () => {
    localStorage.removeItem('LOGIN_INFO');
};