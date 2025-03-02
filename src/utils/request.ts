import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { encrypt, decrypt } from './crypto';
import NProgress from 'nprogress';

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
    // 开启进度条
    NProgress.start();

    // 添加token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // 加密请求数据
    if (config.data && config.headers['encrypt'] === true) {
      config.data = encrypt(JSON.stringify(config.data));
      delete config.headers['encrypt'];
    }

    // 添加时间戳，防止缓存
    if (config.method?.toLowerCase() === 'get') {
      config.params = { ...config.params, _t: Date.now() };
    }

    return config;
  },
  (error) => {
    NProgress.done();
    console.error('请求错误：', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    NProgress.done();
    const res = response.data;

    // 解密响应数据
    if (response.config.headers['decrypt'] === true) {
      try {
        const decryptedData = decrypt(res.data);
        res.data = JSON.parse(decryptedData);
      } catch (error) {
        console.error('解密失败：', error);
      }
    }

    // 统一错误处理
    if (res.code !== 200) {
      // 401: 未登录或token过期
      if (res.code === 401) {
        // 清除用户信息
        localStorage.removeItem('token');
        location.reload();
      }
      return Promise.reject(new Error(res.message || '请求失败'));
    }
    return res;
  },
  (error) => {
    NProgress.done();
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