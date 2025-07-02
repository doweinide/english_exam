# 英语考题复习系统

一个功能完备的英语考题复习做题网站，基于 Vue 3 + TypeScript + Tailwind CSS 技术栈开发，支持自定义题库，帮助用户高效备考英语考试。

## ✨ 系统特点

- 📚 **多题型支持**：支持阅读理解、完形填空、英译汉三种常见题型
- 🔍 **智能搜索**：支持按题目类型、关键词搜索和多种排序方式
- 📊 **进度追踪**：自动记录做题进度和正确率，直观展示学习效果
- 🔄 **答题记录**：保存用户答题历史，支持重做错题
- 🌐 **中英对照**：支持中英文对照显示，提升学习效率
- 📱 **响应式设计**：适配各种设备屏幕，随时随地学习
- 🎯 **分页浏览**：优化大量题目的浏览体验
- 💾 **本地存储**：无需登录，本地保存学习进度

## 🚀 快速开始

```bash
# 克隆项目
git clone https://github.com/doweinide/english-exam-system.git

# 安装依赖
npm install
# 或使用 pnpm
pnpm install

# 启动开发服务器
npm run dev
# 或使用 pnpm
pnpm dev
```

## 📚 系统结构

```
├── src/
│   ├── data/           # 题库数据
│   │   └── questionData.ts  # 题库JSON数据
│   ├── stores/         # 状态管理
│   │   └── question.ts      # 题目状态管理
│   ├── types/          # 类型定义
│   │   └── question.ts      # 题目相关类型定义
│   ├── views/          # 页面组件
│   │   ├── EnglishExamView.vue  # 首页（题目列表）
│   │   └── ExamView.vue         # 做题页面
│   └── ...
└── ...
```

## 📝 自定义题库
src\types\question.ts 看相关类型定义
系统支持自定义题库，只需按照以下格式在 `src/data/questionData.ts` 文件中添加题目数据：

```typescript
// 题库数据结构
const rawQuestionData: Chapter[] = [
  {
    id: 'chapter1',  // 章节ID
    title: '第一套题',  // 章节标题
    description: '包含阅读理解和完形填空',  // 章节描述
    questionSets: [  // 题集列表
      {
        id: 'reading1',  // 题集ID（可选，系统会自动生成）
        title: '阅读理解 1',  // 题集标题（可选，系统会自动生成）
        description: '关于某个主题的阅读理解',  // 题集描述
        type: 'reading',  // 题型：'reading'(阅读理解), 'cloze'(完形填空), 'translation'(英译汉)
        article: {  // 阅读文章（仅阅读理解类型需要）
          id: 'article1',
          title: '文章标题',
          titleCN: '文章中文标题',  // 可选
          content: '英文文章内容...',
          contentCN: '中文翻译内容...'  // 可选
        },
        questions: [  // 问题列表
          {
            id: 'q1-1',  // 问题ID
            type: 'reading',  // 问题类型
            text: '英文题目...',
            textCN: '中文题目...',  // 可选
            options: [  // 选项列表
              {
                id: 'q1-1-A',
                text: '选项A',
                textCN: '选项A中文'  // 可选
              },
              // 更多选项...
            ],
            correctOptionId: 'q1-1-A',  // 正确答案ID
            explanation: '解析内容'  // 可选
          },
          // 更多问题...
        ]
      },
      // 更多题集...
    ]
  },
  // 更多章节...
];
```

系统会自动处理题集ID和标题，您只需要关注题目内容即可。
使用自己搭建的vue3 ts tailwind 架子
```bash
git clone https://github.com/doweinide/vue3-Ts-Tailwind-template

```
## 🔧 系统功能

### 首页功能

- **章节浏览**：按章节组织题目，清晰展示学习内容
- **题集筛选**：支持按题型（阅读理解、完形填空、英译汉）筛选
- **关键词搜索**：快速查找特定题目
- **排序功能**：支持按默认顺序、正确率、最近练习时间排序
- **进度统计**：显示每个章节和题集的完成情况和正确率
- **分页导航**：优化大量题目的浏览体验

### 做题功能

- **中英对照**：支持中英文对照显示题目和选项
- **即时反馈**：答题后立即显示正确答案和解析
- **进度保存**：自动保存做题进度和答题记录
- **题目导航**：支持在题目间自由切换
- **完成统计**：显示当前题集的完成情况和正确率

## 📱 响应式设计

系统采用响应式设计，适配各种设备屏幕：

- **桌面端**：优化大屏显示，提供更多内容和功能
- **平板端**：调整布局，保持良好的阅读和操作体验
- **移动端**：简化界面，专注核心功能，确保流畅使用

## 🛠️ 技术栈

- **前端框架**：[Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **UI 框架**：[Tailwind CSS](https://tailwindcss.com/) - 原子化 CSS 框架
- **状态管理**：[Pinia](https://pinia.vuejs.org/) - Vue 状态管理
- **路由管理**：[Vue Router](https://router.vuejs.org/) - Vue 官方路由

## 📄 License

[MIT](./LICENSE)
