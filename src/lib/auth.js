/**
 * 认证配置
 */

const authConfig = {
  // JWT 配置
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '7d',
  },
  
  // OAuth 配置
  oauth: {
    google: {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    github: {
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
  
  // 会话配置
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 天
    updateAge: 24 * 60 * 60, // 24 小时
  },
  
  // 密码策略
  password: {
    minLength: 8,
    requireCapital: true,
    requireNumber: true,
    requireSpecial: true,
  },
};

export default authConfig; 