/**
 * 环境配置
 */
const ENV = {
  // 开发环境
  development: {
    API_BASE_URL: '/api',
    API_PROXY: {
      target: 'http://dev-api.example.com',
      pathRewrite: { '^/api': '' },
    }
  },
  // 测试环境
  test: {
    API_BASE_URL: '/api',
    API_PROXY: {
      target: 'http://test-api.example.com',
      pathRewrite: { '^/api': '' },
    }
  },
  // 预发布环境
  pre: {
    API_BASE_URL: '/api',
    API_PROXY: {
      target: 'http://pre-api.example.com',
      pathRewrite: { '^/api': '' },
    }
  },
  // 生产环境
  production: {
    API_BASE_URL: 'https://api.example.com',
    // 生产环境通常不需要代理
    API_PROXY: null
  }
};

// 获取当前环境
const getEnvironment = () => {
  // 从环境变量获取，默认为 development
  return process.env.NODE_ENV || 'development';
};

// 获取当前环境的配置
const getCurrentEnvConfig = () => {
  const env = getEnvironment();
  return ENV[env] || ENV.development;
};

export const envConfig = getCurrentEnvConfig();
