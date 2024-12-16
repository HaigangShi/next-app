'use client';

/**
 * Example:
 * const [value, setValue, removeValue] = useStorage('key', initialValue, { expires: 0 }); 过期时间（毫秒）
 * const [theme, setTheme, removeTheme] = useStorage('theme', 'light');
 * const [settings, setSettings] = useStorage('settings', {}, {
 *   expires: 7 * 24 * 60 * 60 * 1000 // 7天过期
 * });
 */

import { useState, useEffect, useCallback } from 'react';
import Storage from '@/utils';

export default function useStorage(key, initialValue = null, options = {}) {
  const { expires } = options;

  // 获取初始值
  const [storedValue, setStoredValue] = useState(() => {
    try {
      return Storage.get(key, initialValue);
    } catch (error) {
      console.warn(`Error reading storage key "${key}":`, error);
      return initialValue;
    }
  });

  // 更新存储的值
  const setValue = useCallback((value) => {
    try {
      // 允许value是一个函数，保持与useState相同的API
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // 保存到state
      setStoredValue(valueToStore);
      
      // 保存到Storage
      Storage.set(key, valueToStore, expires);
    } catch (error) {
      console.warn(`Error setting storage key "${key}":`, error);
    }
  }, [key, expires, storedValue]);

  // 删除存储的值
  const removeValue = useCallback(() => {
    try {
      Storage.remove(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing storage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // 监听其他标签页的变化
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === Storage.getKey(key)) {
        try {
          const newValue = e.newValue ? JSON.parse(e.newValue).value : initialValue;
          setStoredValue(newValue);
        } catch (error) {
          console.warn(`Error handling storage change for key "${key}":`, error);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
