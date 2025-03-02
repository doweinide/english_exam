# Vue 3 + TypeScript + Tailwind 项目模板

一个功能完备的 Vue 3 项目模板，集成了 TypeScript、Tailwind CSS、Pinia 等现代开发技术。

## ✨ 特性

- 🚀 [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - 原子化 CSS 框架
- 📦 [Pinia](https://pinia.vuejs.org/) - Vue 状态管理
- 🔒 请求加密 - 基于 crypto-js 的数据加密
- 📡 [Axios](https://axios-http.com/) - 请求库封装
- 🛠 [Lodash](https://lodash.com/) - 工具函数封装
- 🎯 ESLint + Prettier - 代码规范
- 📱 PWA 支持
- 🗂 多环境配置
- 📊 构建分析
- 🔥 热更新
- 🔧 代码分块优化

## 🎯 环境支持

- Node.js >= 18.18.0
- pnpm >= 8.0.0

## 📦 快速开始

```bash
# 克隆项目
git clone [your-repo-url]

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

## 🔧 构建

```bash
# 开发环境构建
pnpm build:dev

# 测试环境构建
pnpm build:test

# 生产环境构建
pnpm build:prod
```

## 📚 项目结构

\`\`\`
├── src/
│   ├── api/            # API 接口
│   ├── assets/         # 静态资源
│   ├── components/     # 公共组件
│   ├── router/         # 路由配置
│   ├── stores/         # Pinia 状态管理
│   ├── types/          # TypeScript 类型
│   ├── utils/          # 工具函数
│   └── views/          # 页面组件
├── public/             # 公共资源
├── .env.*             # 环境变量配置
├── vite.config.ts     # Vite 配置
└── tailwind.config.js # Tailwind 配置
\`\`\`

## 🔨 功能模块

### 🔐 请求加密
- AES 加密/解密支持
- MD5 加密
- 可配置的加密开关

### 🌐 请求封装
- 统一的错误处理
- 请求/响应拦截
- 取消请求支持
- 自动刷新 token

### 🛠 工具函数
- 日期格式化
- 金额格式化
- 文件处理
- 防抖/节流
- 深拷贝
- 类型判断

### ⚙️ 环境配置
- 开发环境（development）
- 测试环境（test）
- 生产环境（production）

### 📱 PWA 支持
- 离线缓存
- 自动更新
- 添加到主屏幕

## 🔧 环境变量

| 变量名 | 说明 | 可选值 |
|--------|------|--------|
| VITE_APP_ENV | 环境标识 | development/test/production |
| VITE_USE_ENCRYPT | 是否启用加密 | true/false |
| VITE_USE_COMPRESS | 是否启用压缩 | true/false |
| VITE_USE_PWA | 是否启用 PWA | true/false |
| VITE_USE_ANALYZE | 是否启用构建分析 | true/false |
| VITE_USE_MOCK | 是否启用 Mock | true/false |
| VITE_USE_DEVTOOLS | 是否启用开发工具 | true/false |

## 📝 开发指南

### 添加新页面
1. 在 \`src/views\` 下创建页面组件
2. 在 \`src/router\` 中添加路由配置
3. 在 \`src/api\` 中添加相关 API

### 状态管理
1. 在 \`src/stores\` 下创建 store
2. 使用 \`defineStore\` 定义 store
3. 在组件中使用 \`useStore\` 访问

### API 调用示例
\`\`\`typescript
import { getUserInfo } from '@/api/user'

// 获取用户信息
const response = await getUserInfo()
\`\`\`

### 工具函数使用
\`\`\`typescript
import { formatDate, formatAmount } from '@/utils/common'

// 格式化日期
const date = formatDate(new Date(), 'YYYY-MM-DD')

// 格式化金额
const amount = formatAmount(1234.56)
\`\`\`

## 📄 License

[MIT](./LICENSE)
