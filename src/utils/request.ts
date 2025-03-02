import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { encrypt, decrypt } from './crypto';

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在这里可以添加token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // 如果需要加密请求数据
    if (config.data && config.headers['encrypt'] === true) {
      config.data = encrypt(JSON.stringify(config.data));
      delete config.headers['encrypt'];
    }

    return config;
  },
  (error) => {
    console.error('请求错误：', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;

    // 如果需要解密响应数据
    if (response.config.headers['decrypt'] === true) {
      try {
        const decryptedData = decrypt(res.data);
        res.data = JSON.parse(decryptedData);
      } catch (error) {
        console.error('解密失败：', error);
      }
    }

    // 这里可以根据后端的状态码进行不同的处理
    if (res.code !== 200) {
      // 处理错误情况
      return Promise.reject(new Error(res.message || '请求失败'));
    }
    return res;
  },
  (error) => {
    console.error('响应错误：', error);
    return Promise.reject(error);
  }
);

// 封装GET请求
export const get = <T>(url: string, params?: any, config: AxiosRequestConfig = {}): Promise<T> => {
  return service.get(url, { params, ...config });
};

// 封装POST请求
export const post = <T>(url: string, data?: any, config: AxiosRequestConfig = {}): Promise<T> => {
  return service.post(url, data, config);
};

// 封装PUT请求
export const put = <T>(url: string, data?: any, config: AxiosRequestConfig = {}): Promise<T> => {
  return service.put(url, data, config);
};

// 封装DELETE请求
export const del = <T>(url: string, config: AxiosRequestConfig = {}): Promise<T> => {
  return service.delete(url, config);
};

export default service; 