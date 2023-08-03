// 导入CryptoJS加密库
import CryptoJS from "crypto-js";

// 加密
export const AES_CBC_ENCRYPT = (text, secretKey) => {
    const keyHex = CryptoJS.enc.Base64.parse(secretKey);
    const ivHex = keyHex.clone();
    ivHex.sigBytes = 16;
    ivHex.words.splice(4);
    const messageHex = CryptoJS.enc.Utf8.parse(text);
    const encrypted = CryptoJS.AES.encrypt(messageHex, keyHex, {
        "iv": ivHex,
        "mode": CryptoJS.mode.CBC,
        "padding": CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

// 解密
export const AES_CBC_DECRYPT = (textBase64, secretKey) => {
    const keyHex = CryptoJS.enc.Base64.parse(secretKey);
    const ivHex = keyHex.clone();
    ivHex.sigBytes = 16;
    ivHex.words.splice(4);
    const decrypt = CryptoJS.AES.decrypt(textBase64, keyHex, {
        "iv": ivHex,
        "mode": CryptoJS.mode.CBC,
        "padding": CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Utf8.stringify(decrypt);
}