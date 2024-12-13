/**
 * Storage 类 - 封装 localStorage，支持过期时间等特性
 * 
 * // 可以在应用启动时设置前缀
 * Storage.setPrefix('myapp_');
 * 
 * // 使用存储
 * Storage.set('user', { name: 'John' });
 * const user = Storage.get('user');
 * 
 */
class Storage {
  static prefix = 'app_';
  static storage = typeof window !== 'undefined' ? window.localStorage : null;

  /**
   * 设置前缀
   * @param {string} prefix - 新的前缀
   */
  static setPrefix(prefix) {
    this.prefix = prefix;
  }

  /**
   * 获取完整的键名
   * @param {string} key - 键名
   * @returns {string} 带前缀的完整键名
   */
  static getKey(key) {
    return `${this.prefix}${key}`;
  }

  /**
   * 设置存储项
   * @param {string} key - 键名
   * @param {any} value - 值
   * @param {number} [expires] - 过期时间（毫秒）
   */
  static set(key, value, expires) {
    if (!this.storage) return;

    const data = {
      value,
      timestamp: Date.now(),
    };

    if (expires) {
      data.expires = expires;
    }

    try {
      this.storage.setItem(this.getKey(key), JSON.stringify(data));
    } catch (error) {
      console.error('Storage set error:', error);
      // 存储空间不足时，清理过期数据
      if (error.name === 'QuotaExceededError') {
        this.clearExpired();
      }
    }
  }

  /**
   * 获取存储项
   * @param {string} key - 键名
   * @param {any} defaultValue - 默认值
   * @returns {any} 存储的值或默认值
   */
  static get(key, defaultValue = null) {
    if (!this.storage) return defaultValue;

    try {
      const item = this.storage.getItem(this.getKey(key));
      if (!item) return defaultValue;

      const data = JSON.parse(item);
      
      // 检查是否过期
      if (data.expires) {
        const now = Date.now();
        if (now - data.timestamp > data.expires) {
          this.remove(key);
          return defaultValue;
        }
      }

      return data.value;
    } catch (error) {
      console.error('Storage get error:', error);
      return defaultValue;
    }
  }

  /**
   * 删除存储项
   * @param {string} key - 键名
   */
  static remove(key) {
    if (!this.storage) return;
    this.storage.removeItem(this.getKey(key));
  }

  /**
   * 清除所有存储项
   */
  static clear() {
    if (!this.storage) return;
    
    // 只清除带有指定前缀的项
    Object.keys(this.storage).forEach(key => {
      if (key.startsWith(this.prefix)) {
        this.storage.removeItem(key);
      }
    });
  }

  /**
   * 清除所有过期的存储项
   */
  static clearExpired() {
    if (!this.storage) return;

    Object.keys(this.storage).forEach(key => {
      if (key.startsWith(this.prefix)) {
        try {
          const item = this.storage.getItem(key);
          if (!item) return;

          const data = JSON.parse(item);
          if (data.expires) {
            const now = Date.now();
            if (now - data.timestamp > data.expires) {
              this.storage.removeItem(key);
            }
          }
        } catch (error) {
          console.error('Clear expired item error:', error);
        }
      }
    });
  }

  /**
   * 获取所有存储项的键名
   * @returns {string[]} 键名数组
   */
  static keys() {
    if (!this.storage) return [];

    return Object.keys(this.storage)
      .filter(key => key.startsWith(this.prefix))
      .map(key => key.slice(this.prefix.length));
  }

  /**
   * 获取存储使用量信息
   * @returns {Object} 使用量信息
   */
  static getUsage() {
    if (!this.storage) return { usage: 0, quota: 0 };

    let total = 0;
    Object.keys(this.storage).forEach(key => {
      if (key.startsWith(this.prefix)) {
        total += this.storage.getItem(key).length;
      }
    });

    return {
      usage: total,
      quota: 5 * 1024 * 1024, // 默认配额 5MB
      percentage: (total / (5 * 1024 * 1024)) * 100
    };
  }
}

export default Storage;
