import CryptoJS from 'crypto-js';

// 加密密钥
const SECRET_KEY = 'your-secret-key-here';

/**
 * AES加密
 * @param data 需要加密的数据
 * @returns 加密后的字符串
 */
export const encrypt = (data: string): string => {
  const encrypted = CryptoJS.AES.encrypt(data, SECRET_KEY);
  return encrypted.toString();
};

/**
 * AES解密
 * @param encryptedData 加密后的字符串
 * @returns 解密后的数据
 */
export const decrypt = (encryptedData: string): string => {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return decrypted.toString(CryptoJS.enc.Utf8);
};

/**
 * MD5加密
 * @param data 需要加密的数据
 * @returns MD5加密后的字符串
 */
export const md5 = (data: string): string => {
  return CryptoJS.MD5(data).toString();
}; 