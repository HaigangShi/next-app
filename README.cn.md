# Next.js 最佳实践

基于 [Next.js](https://nextjs.org) 和 [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) 构建的现代化 Web 应用模板。

## 快速开始

### 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev         # 开发环境
npm run dev:test    # 测试环境
npm run dev:pre     # 预发布环境
```

### 构建部署

```bash
# 构建应用
npm run build         # 生产环境构建
npm run build:test    # 测试环境构建
npm run build:pre     # 预发布环境构建

# 启动服务
npm run start         # 生产环境
npm run start:test    # 测试环境
npm run start:pre     # 预发布环境
```

## 项目结构

```
next-app/
├── public/          # 静态资源文件
│   └── images/      # 图片资源
├── src/
│   ├── app/         # 页面文件（App Router）
│   ├── components/  # 可复用组件
│   ├── contexts/    # React Context
│   ├── hooks/       # 自定义 Hooks
│   ├── lib/         # 第三方库配置
│   ├── services/    # API 服务和数据获取
│   ├── styles/      # 全局样式和 CSS 模块
│   └── utils/       # 工具函数
├── .gitignore       # Git 忽略配置
├── next.config.mjs  # Next.js 配置
├── package.json     # 项目依赖配置
└── README.md        # 项目说明文档
```

## 技术栈

- **框架**: Next.js 15.1.0 + React 19
- **样式**: Tailwind CSS
- **HTTP 请求**: Axios
- **开发工具**:
  - ESLint: 代码规范检查
  - PostCSS: CSS 处理器
  - 多环境配置支持

## 工具模块

### Storage 工具类

封装了 localStorage，提供更便捷的存储操作：

```javascript
// 设置存储前缀
Storage.setPrefix('myapp_');

// 存储数据
Storage.set('user', { name: 'John' });

// 获取数据
const user = Storage.get('user');
```

特性：
- 可配置的键名前缀
- 浏览器兼容性处理
- TypeScript 支持

## 开发规范

### 代码风格
- 遵循项目 ESLint 配置
- 使用 Tailwind CSS 进行样式开发
- 保持组件的模块化和可复用性

### 项目组织
- 页面文件放置在 `src/app/` 目录下
- 可复用组件放置在 `src/components/` 目录下
- 业务逻辑实现在 `src/services/` 目录下
- 工具函数存放在 `src/utils/` 目录下

### 最佳实践
- 根据不同环境使用对应的环境变量
- 遵循 Next.js 推荐的路由和数据获取模式
- 保持良好的代码注释和文档

## 部署

推荐使用 [Vercel 平台](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) 进行部署，这是 Next.js 官方推荐的部署平台。

## 贡献指南

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建一个 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情
