/**
 * Cookie 工具类
 * 
 * // 存储字符串
 * Cookie.set('name', 'John');
 * Cookie.set('name', { name: 'John', email: 'john@example.com' });
 * Cookie.set('token', 'xyz123', {
 *  expires: 30,         // 30天后过期
 *  path: '/app',        // 只在 /app 路径下可用
 *  domain: '.example.com', // 可跨子域名访问
 *  secure: true,        // 只在 HTTPS 下传输
 *  sameSite: 'Strict'   // 严格的 CSRF 保护
 * });
 * 
 * // 获取字符串
 * const name = Cookie.get('name');
 * 
 * // 删除字符串
 * Cookie.remove('name');
 * 
 */
class Cookie {
  /**
   * 设置 cookie
   * @param {string} name - cookie 名称
   * @param {any} value - cookie 值（支持对象）
   * @param {Object} options - cookie 选项
   * @param {number} options.expires - 过期时间（天数）
   * @param {string} options.path - 路径
   * @param {string} options.domain - 域名
   * @param {boolean} options.secure - 是否只在 https 下传输
   * @param {string} options.sameSite - CSRF 保护
   */
  static set(name, value, options = {}) {
    if (typeof window === 'undefined') return;

    const {
      expires = 7,
      path = '/',
      domain = '',
      secure = false,
      sameSite = 'Lax'
    } = options;

    // 处理对象类型的值
    const stringValue = typeof value === 'object' 
      ? JSON.stringify(value)
      : String(value);

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(stringValue)}`;

    // 设置过期时间
    if (expires) {
      const date = new Date();
      date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
      cookieString += `; expires=${date.toUTCString()}`;
    }

    // 设置路径
    if (path) {
      cookieString += `; path=${path}`;
    }

    // 设置域名
    if (domain) {
      cookieString += `; domain=${domain}`;
    }

    // 设置安全标志
    if (secure) {
      cookieString += '; secure';
    }

    // 设置 SameSite
    if (sameSite) {
      cookieString += `; samesite=${sameSite}`;
    }

    document.cookie = cookieString;
  }

  /**
   * 获取 cookie
   * @param {string} name - cookie 名称
   * @param {boolean} [parseJson=true] - 是否尝试解析 JSON
   * @returns {any} cookie 值
   */
  static get(name, parseJson = true) {
    if (typeof window === 'undefined') return null;

    const cookies = document.cookie.split('; ');
    const cookie = cookies.find(c => c.startsWith(encodeURIComponent(name) + '='));
    
    if (!cookie) return null;
    
    const value = decodeURIComponent(cookie.split('=')[1]);

    if (!parseJson) return value;

    // 尝试解析 JSON
    try {
      return JSON.parse(value);
    } catch {
      // 如果解析失败，返回原始值
      return value;
    }
  }

  /**
   * 删除 cookie
   * @param {string} name - cookie 名称
   * @param {Object} options - cookie 选项
   */
  static remove(name, options = {}) {
    if (typeof window === 'undefined') return;

    // 通过设置过期时间为过去的时间来删除 cookie
    this.set(name, '', { ...options, expires: -1 });
  }

  /**
   * 检查 cookie 是否存在
   * @param {string} name - cookie 名称
   * @returns {boolean} 是否存在
   */
  static has(name) {
    return this.get(name, false) !== null;
  }

  /**
   * 获取所有 cookie
   * @param {boolean} [parseJson=true] - 是否尝试解析 JSON
   * @returns {Object} cookie 对象
   */
  static getAll(parseJson = true) {
    if (typeof window === 'undefined') return {};

    const cookies = {};
    document.cookie.split('; ').forEach(cookie => {
      if (cookie) {
        const [name, value] = cookie.split('=').map(decodeURIComponent);
        cookies[name] = parseJson ? this.get(name, true) : value;
      }
    });
    return cookies;
  }

  /**
   * 清除所有 cookie
   * @param {Object} options - cookie 选项
   */
  static clear(options = {}) {
    if (typeof window === 'undefined') return;

    const cookies = this.getAll(false);
    Object.keys(cookies).forEach(name => {
      this.remove(name, options);
    });
  }
}

export default Cookie;
