# Markdown Editor - 在线 Markdown 编辑器

一个现代化的 Markdown 编辑器，支持实时预览和多平台导出功能。

## 功能特性

### 当前功能 (Phase 1)
- ✅ **实时预览**：左侧编辑区，右侧实时预览，所见即所得
- ✅ **Markdown 支持**：完整支持标准 Markdown 语法
- ✅ **美观样式**：精心设计的预览样式，专业且易读
- ✅ **代码高亮**：支持代码块语法高亮
- ✅ **响应式设计**：自适应不同屏幕尺寸

### 未来功能 (Phase 2)
- 🔲 **主题切换**：支持多种主题风格
- 🔲 **字体定制**：可选择不同字体和字号
- 🔲 **主题色调整**：自定义主题颜色
- 🔲 **多平台导出**：
  - 微信公众号
  - 今日头条
  - X (Twitter)
  - 小红书
  - Bilibili
- 🔲 **文档管理**：保存和管理多个文档
- 🔲 **协作功能**：支持多人协作编辑

## 技术栈

- **前端框架**：React 18+ with TypeScript
- **构建工具**：Vite
- **Markdown 解析**：marked
- **样式方案**：CSS Modules
- **代码规范**：ESLint + TypeScript

## 项目结构

```
├── src/
│   ├── components/          # React 组件
│   │   ├── MarkdownEditor.tsx      # 主编辑器组件
│   │   ├── SideBar.tsx             # 侧边栏组件（待实现）
│   │   ├── ThemeSelector.tsx       # 主题选择器（待实现）
│   │   ├── ChannelExporter.tsx     # 平台导出器（待实现）
│   │   └── PostPublish.tsx         # 发布组件（待实现）
│   ├── utils/               # 工具函数
│   │   ├── markdownToHtml.ts       # Markdown 转 HTML
│   │   └── api.ts                  # API 接口（待实现）
│   ├── App.tsx              # 主应用组件
│   ├── main.tsx            # 应用入口
│   └── index.css           # 全局样式
├── index.html              # HTML 模板
├── package.json            # 项目配置
├── tsconfig.json           # TypeScript 配置
├── vite.config.ts          # Vite 配置
└── README.md               # 项目文档
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173 查看应用。

### 构建生产版本

```bash
npm run build
```

构建后的文件将输出到 `dist` 目录。

### 预览生产版本

```bash
npm run preview
```

### 部署到 GitHub Pages

本项目配置了自动部署到 GitHub Pages。当代码推送到 `main` 分支时，GitHub Actions 会自动构建并部署应用。

手动部署步骤：
1. 确保代码已推送到 `main` 分支
2. 在 GitHub 仓库设置中，进入 Settings > Pages
3. Source 选择 "GitHub Actions"
4. 部署完成后，访问 `https://<username>.github.io/<repository>/`

## 使用说明

1. 在左侧编辑区输入 Markdown 内容
2. 右侧预览区将实时显示渲染后的效果
3. 支持的 Markdown 语法：
   - 标题 (`#`, `##`, `###`, etc.)
   - 粗体 (`**text**`)
   - 斜体 (`*text*`)
   - 列表（有序和无序）
   - 引用 (`> text`)
   - 代码块（行内和代码块）
   - 链接 (`[text](url)`)
   - 图片 (`![alt](url)`)
   - 表格
   - 分隔线 (`---`)

## 开发计划

- [x] Phase 1: 基础 Markdown 编辑和预览功能
- [ ] Phase 2: 主题和样式定制功能
- [ ] Phase 3: 多平台导出功能
- [ ] Phase 4: 文档管理和协作功能

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可

MIT License