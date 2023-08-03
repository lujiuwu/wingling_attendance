import { AES_CBC_DECRYPT, AES_CBC_ENCRYPT } from './crypto';

// 本地缓存补卡申请
export const saveApplyCard = (params) => {
    const secretKey = process.env.VUE_APP_SECRET_KEY;
    const encrypt = AES_CBC_ENCRYPT(JSON.stringify(params), secretKey);
    localStorage.setItem('applyCard', encrypt);
}

// 获取本地缓存的补卡申请
export const getApplyCard = () => {
    if (!localStorage.getItem('applyCard')) return;
    const secretKey = process.env.VUE_APP_SECRET_KEY;
    const decrypt = AES_CBC_DECRYPT(localStorage.getItem('applyCard'), secretKey);
    return JSON.parse(decrypt);
}

// 清除本地缓存的补卡申请
export const clearApplyCard = () => {
    localStorage.removeItem('applyCard');
}