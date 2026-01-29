# Java Hands-on Lab 交互式教学平台

[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-purple)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-cyan)](https://tailwindcss.com/)

[English](./README.md) | [简体中文](./README_zh-CN.md)

**Java Hands-on Lab** 是一个可视化的 Java 在线互动学习平台。本项目旨在通过网页端的图形化界面和生动的动画演示，将枯燥的 Java 概念（如内存模型、垃圾回收、多线程竞争、集合扩容等）转化为直观的视觉体验，帮助初学者深入理解 Java 的运行机制。

## ✨ 项目特色

- **可视化教学**: 动态展示 Stack（栈）和 Heap（堆）的内存分配、引用关系、垃圾回收过程。
- **互动实验**: 不仅仅是阅读，你可以亲自操作变量、线程和集合，观察代码背后的逻辑变化。
- **双语支持**: 完整的中英文界面和教学文档支持。
- **深色模式**: 完美适配日间和夜间阅读体验。
- **现代技术栈**: 基于最新的 React 19 和 Tailwind CSS v4 构建，体验丝滑流畅。

## 📂 项目结构

本项目主要代码位于 `web` 目录下，是一个标准的现代前端工程：

```text
java-handson-lab/
├── web/                   # 前端工程根目录
│   ├── src/
│   │   ├── components/    # 公共组件 (布局、导航等)
│   │   ├── context/       # 全局状态 (主题、语言配置)
│   │   ├── locales/       # 国际化资源文件 (en.json, zh.json)
│   │   ├── pages/
│   │   │   ├── labs/      # 核心实验模块 (每个文件夹代表一个实验)
│   │   │   │   ├── ArrayList/     # ArrayList 扩容实验
│   │   │   │   ├── LinkedList/    # LinkedList 链表实验
│   │   │   │   ├── Stack/         # 栈内存实验
│   │   │   │   ├── ...            # 更多实验...
│   │   │   │   │   ├── Demo.tsx   # 交互演示组件 (核心逻辑)
│   │   │   │   │   ├── Guide.tsx  # 教学文档组件 (理论讲解)
│   │   │   │   │   └── index.tsx  # 实验入口文件
│   │   │   └── Home.tsx   # 首页
│   │   ├── App.tsx        # 路由配置
│   │   └── main.tsx       # 入口文件
│   ├── package.json
│   └── vite.config.ts
└── PROJECT_PLAN.md        # 项目规划文档
```

## 🚀 快速开始 (小白教程)

如果你是编程新手，想在本地运行这个项目，请按照以下步骤操作：

### 1. 环境准备
你需要安装 **Node.js** 环境。
- 访问 [Node.js 官网](https://nodejs.org/) 下载并安装 LTS 版本（推荐 v18 或更高）。
- 安装完成后，打开终端（Windows 下按 `Win+R` 输入 `cmd`），输入 `node -v` 检查是否安装成功。

### 2. 下载代码
你可以使用 Git 克隆仓库，或者直接下载 ZIP 压缩包。

```bash
# 如果你安装了 Git
git clone https://github.com/your-username/java-handson-lab.git
```

### 3. 安装依赖并运行
打开你的终端（或 VS Code 的终端），进入项目的 `web` 目录，安装依赖并启动项目。

```bash
# 1. 进入 web 目录
cd java-handson-lab/web

# 2. 安装项目依赖 (这一步可能需要几分钟)
npm install

# 3. 启动开发服务器
npm run dev
```

启动成功后，终端会显示一个地址（通常是 `http://localhost:5173`），在浏览器中打开这个地址即可开始学习！

## 🛠️ 技术实现与开发指南

本项目使用 **React** 作为核心框架，通过 **组件化** 的思想来组织每个实验。

### 核心架构
每个实验（Lab）都是一个独立的模块，位于 `src/pages/labs/` 下。一个标准的实验包含三个文件：

1.  **`index.tsx`**: 入口文件。使用 `LabLayout` 包裹，负责整合 Guide 和 Demo，并定义实验的标题。
2.  **`Guide.tsx`**: 教学指南。
    -   负责展示理论知识。
    -   通常包含 `GuideZh` (中文) 和 `GuideEn` (英文) 两个组件，根据当前的 `i18n.language` 动态切换显示。
    -   使用 Tailwind CSS 进行排版和样式美化。
3.  **`Demo.tsx`**: 交互演示。
    -   **状态管理**: 使用 `useState` 管理实验状态（如变量值、内存块位置、线程状态）。
    -   **动画效果**: 使用 `framer-motion` 实现平滑的过渡动画（如元素入栈、链表节点移动）。
    -   **逻辑模拟**: 用 TypeScript 代码模拟 Java 的运行逻辑（如模拟 HashMap 的 hash 计算）。

### 贡献指南 (How to Contribute)

如果你想为项目添加一个新的 Java 实验（例如 "PriorityQueue"），请按以下步骤操作：

1.  **创建目录**: 在 `src/pages/labs/` 下新建文件夹 `PriorityQueue`。
2.  **创建文件**: 复制其他实验的 `index.tsx`, `Guide.tsx`, `Demo.tsx` 到新目录作为模板。
3.  **编写内容**:
    -   修改 `Guide.tsx`，编写关于 PriorityQueue 的原理讲解。
    -   修改 `Demo.tsx`，实现堆的插入和删除可视化逻辑。
    -   修改 `index.tsx`，更新标题和 ID。
4.  **注册路由**:
    -   在 `src/App.tsx` 中导入新页面并配置路由路径 `/lab/priority-queue`。
    -   在 `src/pages/Home.tsx` 的列表数据中添加新实验的入口卡片。
5.  **添加翻译**: 在 `src/locales/` 下的 `zh.json` 和 `en.json` 中添加对应的翻译词条。

---

## 🤝 参与贡献

欢迎提交 Issue 或 Pull Request！无论是修复 Bug、改进文档，还是增加新的实验案例，你的贡献都能帮助更多人更好地学习 Java。

## 📄 许可证

MIT License
