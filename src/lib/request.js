import axios from 'axios';
import { envConfig } from '@/config/env';
import { Storage, Cookie } from '@/utils';

// 处理响应错误
const codeMessage = (error) => {
  switch (error.response.status) {
    case 401:
      // 未授权，清除认证信息
      Storage.remove('token');
      Cookie.remove('token');
      // 可以在这里添加路由跳转逻辑
      break;
    case 403:
      // 权限不足
      console.error('Permission denied');
      break;
    case 404:
      // 请求的资源不存在
      console.error('Resource not found');
      break;
    case 500:
      // 服务器错误
      console.error('Server error');
      break;
    default:
      console.error('Network error');
  }
}

// 创建 axios 实例
const request = axios.create({
  baseURL: envConfig.API_BASE_URL, // 基础URL
  timeout: 15000,  // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    // 优先从 Cookie 获取 token，如果没有则从 localStorage 获取
    const token = Cookie.get('token') || Storage.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    const { data } = response;
    
    // 这里可以根据你的后端接口规范调整
    // 假设后端返回格式为 { code: number, data: any, message: string }
    if (data.code === 200) {
      return data.data;
    }
    
    // 处理其他响应状态码
    const error = new Error(data.message || 'Unknown error');
    error.code = data.code;
    return Promise.reject(error);
  },
  (error) => {
    // 对响应错误做点什么
    if (error.response) {
      // 请求已发出，但服务器响应状态码不在 2xx 范围内
      codeMessage(error);
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error('No response received');
    } else {
      // 请求配置出错
      console.error('Request configuration error');
    }
    return Promise.reject(error);
  }
);

// 封装 HTTP 方法
export const http = {
  get: (url, params, config = {}) => 
    request.get(url, { ...config, params }),

  post: (url, data, config = {}) =>
    request.post(url, data, config),

  put: (url, data, config = {}) =>
    request.put(url, data, config),

  patch: (url, data, config = {}) =>
    request.patch(url, data, config),

  delete: (url, config = {}) =>
    request.delete(url, config),
};

// 导出 request 实例
export default request;
