import { get, post } from '@/utils/request';
import type { AxiosRequestConfig } from 'axios';

// 定义接口返回数据类型
interface ResponseData<T = any> {
  code: number;
  data: T;
  message: string;
}

// 用户信息接口
interface UserInfo {
  id: number;
  username: string;
  email: string;
  avatar?: string;
}

// 登录参数接口
interface LoginParams {
  username: string;
  password: string;
}

/**
 * 用户登录
 * @param data 登录参数
 * @param config 请求配置
 */
export const login = (data: LoginParams, config?: AxiosRequestConfig) => {
  return post<ResponseData<{ token: string }>>('/user/login', data, {
    ...config,
    headers: {
      ...config?.headers,
      encrypt: true, // 开启请求加密
    },
  });
};

/**
 * 获取用户信息
 * @param config 请求配置
 */
export const getUserInfo = (config?: AxiosRequestConfig) => {
  return get<ResponseData<UserInfo>>('/user/info', undefined, config);
};

/**
 * 更新用户信息
 * @param data 用户信息
 * @param config 请求配置
 */
export const updateUserInfo = (
  data: Partial<UserInfo>,
  config?: AxiosRequestConfig
) => {
  return post<ResponseData<UserInfo>>('/user/update', data, config);
};
