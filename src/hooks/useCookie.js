'use client';

/**
 * Example:
 * const [token, setToken, removeToken] = useCookie('token', null, {
 *   expires: 7,          // 7天后过期
 *   path: '/app',        // 只在 /app 路径下可用
 *   domain: '.example.com', // 可跨子域名访问
 *   secure: true,        // 只在 HTTPS 下传输
 *   sameSite: 'Strict'   // 严格的 CSRF 保护
 * });
 * 
 * const [theme, setTheme] = useCookie('theme', 'light');
 * 
 * const [userInfo, setUserInfo] = useCookie('userInfo', { 
 *   name: 'John',
 *   email: 'john@example.com'
 * });
 */

import { useState, useCallback, useEffect } from 'react';
import { Cookie } from '@/utils';

export default function useCookie(name, initialValue = null, options = {}) {
  // 获取初始值
  const [value, setValue] = useState(() => {
    try {
      const cookieValue = Cookie.get(name);
      return cookieValue !== null ? cookieValue : initialValue;
    } catch (error) {
      console.warn(`Error reading cookie "${name}":`, error);
      return initialValue;
    }
  });

  // 更新cookie的值
  const updateCookie = useCallback((newValue, updateOptions = {}) => {
    try {
      // 允许value是一个函数，保持与useState相同的API
      const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
      
      // 保存到state
      setValue(valueToStore);
      
      // 保存到cookie
      Cookie.set(name, valueToStore, { ...options, ...updateOptions });
    } catch (error) {
      console.warn(`Error setting cookie "${name}":`, error);
    }
  }, [name, options, value]);

  // 删除cookie
  const removeCookie = useCallback(() => {
    try {
      Cookie.remove(name, options);
      setValue(initialValue);
    } catch (error) {
      console.warn(`Error removing cookie "${name}":`, error);
    }
  }, [name, options, initialValue]);

  // 监听其他标签页的变化（如果需要）
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === name) {
        try {
          const newValue = Cookie.get(name);
          if (newValue !== value) {
            setValue(newValue !== null ? newValue : initialValue);
          }
        } catch (error) {
          console.warn(`Error handling cookie change for "${name}":`, error);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, [name, value, initialValue]);

  return [value, updateCookie, removeCookie];
}
