# Next.js 最佳实践

基于 [Next.js](https://nextjs.org) 和 [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) 构建的现代化 Web 应用模板。

## 技术栈

- **框架**: Next.js 15.1.0 + React 19
- **样式**: Tailwind CSS
- **HTTP 请求**: Axios
- **开发工具**:
  - ESLint: 代码规范检查
  - PostCSS: CSS 处理器
  - 多环境配置支持

## 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev         # 开发环境

# 构建应用
npm run build       # 生产环境构建
```

## 项目结构

```bash
mkdir -p .github/workflows .husky public/assets/fonts public/assets/images src/app/\(auth\)/login/page.tsx src/app/\(auth\)/register/page.tsx src/app/\(main\) src/app/api/\[trpc\] src/app/_components src/app/_providers src/components/ui src/components/shared src/config src/content src/data src/features/auth/components src/features/auth/hooks src/features/auth/schemas src/hooks src/lib/api src/lib/auth src/lib/db src/lib/utils src/server/actions src/server/services src/server/trpc src/styles src/types prisma tests/e2e tests/unit && touch src/app/layout.tsx src/app/page.tsx src/config/site.ts src/config/routes.ts src/middleware.ts src/styles/globals.css prisma/schema.prisma .env.local .env.example next.config.ts tailwind.config.ts postcss.config.mjs package.json README.md
```

```bash
├── .github/                  # GitHub 相关配置
│   └── workflows/            # CI/CD 配置文件
├── .husky/                   # Git hooks 配置
├── public/                   # 静态资源
│   ├── assets/               # 公共资源
│   │   ├── fonts/            # 字体文件
│   │   └── images/           # 公共图片
├── src/
│   ├── app/                  # App Router 核心目录
│   │   ├── (auth)/           # 鉴权相关路由组
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (main)/           # 主应用路由组
│   │   ├── api/              # API 路由 (可选，推荐独立目录)
│   │   │   └── [trpc]/       # TRPC 路由示例
│   │   ├── _components/      # 全局通用组件
│   │   ├── _providers/       # Context 提供者
│   │   ├── layout.tsx        # 根布局
│   │   └── page.tsx          # 首页
│   ├── components/           # 通用组件库
│   │   ├── ui/               # UI 原子组件 (使用 shadcn/ui 等)
│   │   └── shared/           # 跨功能共享组件
│   ├── config/               # 应用配置
│   │   ├── site.ts           # 网站元数据
│   │   ├── theme.ts          # 主题配置
│   │   └── routes.ts         # 路由配置
│   ├── content/              # CMS 内容 (使用 @contentlayer)
│   ├── data/                 # 模拟数据/测试数据
│   ├── features/             # 功能模块 (领域驱动设计)
│   │   ├── auth/             # 认证模块
│   │   │   ├── components/   # 模块专属组件
│   │   │   ├── hooks/        # 模块专属 hooks
│   │   │   └── schemas/      # Zod 校验规则
│   ├── hooks/                # 全局自定义 hooks
│   ├── lib/                  # 工具库/第三方封装
│   │   ├── api/              # API 客户端封装
│   │   ├── auth/             # 鉴权逻辑
│   │   ├── db/               # 数据库客户端 (Prisma)
│   │   └── utils/            # 工具函数
│   ├── middleware.ts         # 中间件配置
│   ├── server/               # 服务端代码
│   │   ├── actions/          # Server Actions
│   │   ├── services/         # 业务逻辑层
│   │   └── trpc/             # TRPC 配置
│   ├── stores/               # 状态管理（Zustand/Jotai）
│   ├── styles/               # 全局样式
│   │   └── globals.css       # 全局 CSS 变量
│   └── types/                # 全局类型定义
├── prisma/                   # Prisma ORM
│   └── schema.prisma         # 数据库 Schema
├── tests/                    # 测试相关
│   ├── e2e/                  # Cypress 测试
│   └── unit/                 # Vitest 单元测试
├── .env.local                # 本地环境变量
├── .env.example              # 环境变量示例
├── next.config.ts            # Next.js 配置
├── tailwind.config.ts        # Tailwind 配置
├── postcss.config.mjs        # PostCSS 配置
├── package.json
└── README.md
```

```bash
.env                # 通用环境变量
.env.development    # 开发环境
.env.production     # 生产环境
.env.test           # 测试环境

"scripts": {
  "dev": "next dev", // dev脚本对应.env.development配置
  "build": "next build", // build脚本对应.env.production配置
}
```

### 关键实践说明：

1. **路由组织**：
- 使用 Route Groups (`(group)`) 组织路由
- API 路由使用 `src/app/api/[...]/route.ts` 格式
- 页面级组件使用 `page.tsx` + `layout.tsx` 组合

2. **组件分类**：
- `_components`：路由级私有组件
- `components/ui`：通用 UI 组件库
- `features/*/components`：功能模块专属组件

3. **状态管理**：
- 全局状态：Zustand 或 Context + useReducer
- 服务端状态：React Query + TRPC
- URL 状态：通过 searchParams 管理

4. **API 层**：
- 推荐使用 TRPC 进行端到端类型安全
- 或使用 Route Handlers + Zod 校验
- 服务层抽象业务逻辑到 `server/services`

. **API Proxy**：
- 开发环境代理（本地）使用 Next.js 内置 Rewrites（推荐）
- 线上配置 nginx 服务器转发接口实现跨域即可

5. **样式方案**：
- Tailwind CSS + CSS Modules
- 主题管理通过 CSS Variables
- 动画使用 `framer-motion`

6. **数据层**：
- Prisma 作为 ORM
- 数据库连接池管理在 `lib/db`
- Server Components 直接访问数据库
- Client Components 通过 API 路由访问

7. **鉴权方案**：
- Auth.js (NextAuth) 作为认证基础
- 权限校验通过 Middleware + Role Based Access Control
- 敏感操作使用 Server Actions 校验

8. **性能优化**：
- 静态元数据生成
- 流式渲染 (Suspense)
- 部分预渲染 (PPR)
- 按需 ISR 重新验证

### 推荐技术栈组合：
- **ORM**: Prisma 或 Drizzle
- **样式**: Tailwind CSS + shadcn/ui
- **状态**: Zustand + React Query
- **验证**: Zod
- **API**: TRPC 或 Next.js Route Handlers
- **测试**: Playwright + Vitest
- **监控**: Sentry 或 Vercel Analytics

### 注意事项：
1. 严格区分 Server/Client 组件
2. 敏感逻辑必须放在 Server-only 环境
3. 使用 `server-actions` 时需注意安全验证
4. 静态资源通过 CDN 优化加载
5. 实施自动化代码质量检查 (ESLint + Prettier + Husky)

这种结构经过多个生产项目验证，能够良好支持：
- 中小型 SaaS 应用开发
- 内容型网站
- 电商平台
- 企业级后台管理系统

根据具体项目需求，可适当调整模块划分和工具链组合。

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
