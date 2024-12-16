/**
 * Device 工具类 - 获取设备信息和地理位置
 * 
 * // 获取设备信息
 * const deviceInfo = Device.getInfo();
 * console.log(deviceInfo);
 * // {
 * //   isMobile: true,
 * //   isTablet: false,
 * //   isDesktop: false,
 * //   os: 'iOS',
 * //   browser: 'Safari',
 * //   browserVersion: '15.0',
 * //   deviceType: 'iPhone',
 * //   orientation: 'portrait'
 * // }
 * 
 * // 获取地理位置
 * const position = await Device.getLocation();
 * console.log(position);
 * // {
 * //   latitude: 37.7749,
 * //   longitude: -122.4194,
 * //   accuracy: 20,
 * //   timestamp: 1623456789000
 * // }
 */

class Device {
  static userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : '';

  /**
   * 获取设备信息
   * @returns {Object} 设备信息对象
   */
  static getInfo() {
    if (typeof window === 'undefined') {
      return {
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        os: 'unknown',
        browser: 'unknown',
        browserVersion: 'unknown',
        deviceType: 'unknown',
        orientation: 'unknown'
      };
    }

    const ua = this.userAgent.toLowerCase();
    
    // 检测操作系统
    const os = this.getOS(ua);
    
    // 检测浏览器
    const { browser, version } = this.getBrowser(ua);
    
    // 检测设备类型
    const {
      isMobile,
      isTablet,
      isDesktop,
      deviceType
    } = this.getDeviceType(ua);

    // 获取屏幕方向
    const orientation = screen.orientation 
      ? screen.orientation.type 
      : window.matchMedia('(orientation: portrait)').matches ? 'portrait' : 'landscape';

    return {
      isMobile,
      isTablet,
      isDesktop,
      os,
      platform: os,
      browser,
      browserVersion: version,
      deviceType,
      orientation,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      language: navigator.language || navigator.userLanguage,
      devicePixelRatio: window.devicePixelRatio || 1
    };
  }

  /**
   * 获取地理位置
   * @param {Object} options - 地理位置选项
   * @param {boolean} options.enableHighAccuracy - 是否启用高精度
   * @param {number} options.timeout - 超时时间（毫秒）
   * @param {number} options.maximumAge - 缓存时间（毫秒）
   * @returns {Promise} 地理位置信息
   */
  static async getLocation(options = {}) {
    if (!navigator.geolocation) {
      throw new Error('Geolocation is not supported by this browser');
    }

    const defaultOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
      ...options
    };

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            altitude: position.coords.altitude,
            altitudeAccuracy: position.coords.altitudeAccuracy,
            heading: position.coords.heading,
            speed: position.coords.speed,
            timestamp: position.timestamp
          });
        },
        (error) => {
          reject(new Error(`Failed to get location: ${error.message}`));
        },
        defaultOptions
      );
    });
  }

  /**
   * 监听地理位置变化
   * @param {Function} callback - 位置变化回调
   * @param {Object} options - 地理位置选项
   * @returns {Function} 取消监听函数
   */
  static watchLocation(callback, options = {}) {
    if (!navigator.geolocation) {
      throw new Error('Geolocation is not supported by this browser');
    }

    const defaultOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
      ...options
    };

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        callback({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          speed: position.coords.speed,
          timestamp: position.timestamp
        });
      },
      (error) => {
        console.error('Location watch error:', error);
      },
      defaultOptions
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }

  // 私有辅助方法
  static getOS(ua) {
    ua = ua.toLowerCase();
    if (ua.includes('android')) return 'Android';
    if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ipod')) return 'iOS';
    if (ua.includes('windows')) return 'Windows';
    if (ua.includes('mac')) return 'MacOS';
    if (ua.includes('linux')) return 'Linux';
    return 'unknown';
  }

  static getBrowser(ua) {
    let browser = 'unknown';
    let version = 'unknown';

    const browserMatches = {
      chrome: /chrome\/([\\d.]+)/,
      safari: /version\/([\\d.]+).*safari/,
      firefox: /firefox\/([\\d.]+)/,
      opera: /(?:opera|opr)\/([\\d.]+)/,
      edge: /edg\/([\\d.]+)/,
      ie: /msie ([\\d.]+)/
    };

    for (const [name, regex] of Object.entries(browserMatches)) {
      const match = ua.match(regex);
      if (match) {
        browser = name;
        version = match[1];
        break;
      }
    }

    return { browser, version };
  }

  static getDeviceType(ua) {
    // 平板设备正则
    const tabletRegex = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/;
    
    // 移动设备正则
    const mobileRegex = /(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|skyfire|puffin|blazer|bolt|gobrowser|iris|maemo|semc|teashark|uzard)/;
    
    const isTablet = tabletRegex.test(ua);
    const isMobile = mobileRegex.test(ua);
    const isDesktop = !isTablet && !isMobile;

    let deviceType = 'unknown';
    if (isTablet) deviceType = 'tablet';
    else if (isMobile) deviceType = this.getMobileDeviceType(ua);
    else if (isDesktop) deviceType = 'desktop';

    return {
      isMobile,
      isTablet,
      isDesktop,
      deviceType
    };
  }

  static getMobileDeviceType(ua) {
    if (ua.includes('iphone')) return 'iPhone';
    if (ua.includes('ipod')) return 'iPod';
    if (ua.includes('samsung')) return 'Samsung';
    if (ua.includes('huawei')) return 'Huawei';
    if (ua.includes('xiaomi')) return 'Xiaomi';
    if (ua.includes('oppo')) return 'OPPO';
    if (ua.includes('vivo')) return 'vivo';
    if (ua.includes('honor')) return 'Honor';
    if (ua.includes('nokia')) return 'Nokia';
    return 'mobile';
  }
}

export default Device;
