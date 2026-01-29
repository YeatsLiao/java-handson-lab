# Java Hands-on Lab 开发指南

[English](./DEVELOPMENT_GUIDE.md)

欢迎加入 **Java Hands-on Lab** 的开发！本文档旨在帮助你理解项目的架构设计、代码组织方式以及核心开发流程。无论你是想修复 Bug 还是贡献新的实验案例，请务必在开始前阅读本文档。

## 1. 技术栈概览

本项目采用现代化的 React 技术栈构建：

*   **核心框架**: [React 19](https://react.dev/) - 使用最新的 Hooks 和函数式组件模式。
*   **语言**: [TypeScript](https://www.typescriptlang.org/) - 强类型保证代码的健壮性和可维护性。
*   **构建工具**: [Vite](https://vitejs.dev/) - 极速的开发服务器和构建工具。
*   **样式**: [Tailwind CSS v4](https://tailwindcss.com/) - 原子化 CSS，快速构建 UI，支持深色模式。
*   **动画**: [Framer Motion](https://www.framer.com/motion/) - 强大的声明式动画库，用于制作内存块移动、入栈出栈等效果。
*   **国际化**: [i18next](https://www.i18next.com/) - 完整的双语（中/英）支持。

## 2. 项目架构与目录结构

代码位于 `web/src` 目录下，结构清晰且模块化：

```text
src/
├── components/        # 公共组件
│   ├── Layout/        # 全局布局（侧边栏、顶部导航）
│   ├── LabLayout/     # 实验页面的标准布局（左侧指南，右侧演示）
│   └── ui/            # 通用 UI 组件（按钮、卡片等，如果有的话）
├── context/           # 全局 Context
│   └── ThemeContext.tsx # 主题管理（深色/浅色模式切换）
├── locales/           # 国际化资源文件
│   ├── zh.json        # 中文翻译
│   └── en.json        # 英文翻译
├── pages/             # 页面组件
│   ├── Home.tsx       # 首页
│   └── labs/          # 【核心】所有实验模块都存放在这里
│       ├── ArrayList/ # ArrayList 实验
│       ├── Stack/     # Stack 实验
│       └── ...
├── App.tsx            # 路由配置
└── main.tsx           # 应用入口
```

## 3. 实验模块设计 (Lab Anatomy)

这是本项目最核心的设计。**每个实验（Lab）都是一个独立的文件夹**，位于 `src/pages/labs/` 下。为了保持一致性和可维护性，我们遵循以下严格的文件结构：

一个标准的 Lab 文件夹（例如 `src/pages/labs/MyNewLab/`）必须包含三个文件：

### 3.1 `index.tsx` - 入口文件

这是实验的容器，主要负责：
1.  定义实验的唯一 ID 和标题。
2.  使用 `LabLayout` 组件包裹 `Guide` 和 `Demo`。

**代码示例:**
```tsx
import React from 'react';
import { LabLayout } from '../../../components/LabLayout/LabLayout';
import { Guide } from './Guide';
import { Demo } from './Demo';

const MyNewLab: React.FC = () => {
  return (
    <LabLayout 
      title="My New Lab"
      guide={<Guide />} // 左侧：教学指南
      demo={<Demo />}   // 右侧：交互演示
    />
  );
};

export default MyNewLab;
```

### 3.2 `Guide.tsx` - 教学指南

这个组件负责展示理论知识。
*   **设计原则**: 纯静态展示，不做复杂逻辑。
*   **双语支持**: 为了代码清晰，我们通常将中文内容和英文内容拆分为两个子组件 `GuideZh` 和 `GuideEn`，然后根据 `i18n.language` 动态渲染。
*   **样式**: 使用 Tailwind CSS 进行排版。对于代码块，使用深色背景容器。

**代码模式:**
```tsx
const GuideZh = () => (
  <div className="space-y-4">
    <h3>概念介绍</h3>
    <p>这里是中文讲解...</p>
  </div>
);

const GuideEn = () => (
  <div className="space-y-4">
    <h3>Concept</h3>
    <p>English explanation here...</p>
  </div>
);

export const Guide = () => {
  const { i18n } = useTranslation();
  return i18n.language === 'zh' ? <GuideZh /> : <GuideEn />;
};
```

### 3.3 `Demo.tsx` - 交互演示 (核心)

这是最有趣的部分！你需要在这里用 TypeScript 和 React 模拟 Java 的运行逻辑并将其可视化。

#### 核心思想：逻辑模拟与视图驱动
我们不是真的在浏览器里运行 JVM，而是**模拟** JVM 的行为。
例如，模拟一个栈（Stack）：
1.  **State (数据层)**: 使用 `useState` 定义一个数组 `const [stack, setStack] = useState([])`。
2.  **Logic (逻辑层)**: 编写 `push` 函数，不仅修改数组，还记录日志。
3.  **View (视图层)**: 使用 `map` 渲染数组，每个元素就是一个“内存块”。

#### 动画指南 (Framer Motion)
为了让过程生动，我们广泛使用 `framer-motion`。
*   **布局动画**: 给列表容器内的元素加上 `layout` 属性，当数组顺序变化时，React 会自动计算并播放平滑的移动动画。
*   **进出场动画**: 使用 `<AnimatePresence>` 包裹列表，并给元素设置 `initial` (入场前状态), `animate` (最终状态), `exit` (离场状态)。

**代码示例:**
```tsx
<AnimatePresence>
  {stack.map(item => (
    <motion.div
      key={item.id}
      layout // 自动布局动画
      initial={{ opacity: 0, y: -20 }} // 从上方淡入
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5 }} // 缩小淡出
      className="border p-2"
    >
      {item.value}
    </motion.div>
  ))}
</AnimatePresence>
```

#### 深色模式适配
编写 CSS 类时，必须同时考虑浅色和深色模式。使用 `dark:` 前缀。
*   **背景**: `bg-white dark:bg-gray-800`
*   **文字**: `text-gray-900 dark:text-gray-100`
*   **边框**: `border-gray-200 dark:border-gray-700`

## 4. 开发流程 (Step-by-Step)

假设你要开发一个名为 `PriorityQueue` 的新实验：

1.  **创建目录**: `src/pages/labs/PriorityQueue`。
2.  **复制模板**: 复制 `Stack` 实验下的三个文件到新目录。
3.  **重命名与清理**: 修改 `index.tsx` 中的组件名为 `PriorityQueue`。
4.  **实现 Guide**: 编写关于优先队列的二叉堆原理文档。
5.  **实现 Demo**:
    *   定义 `HeapNode` 接口。
    *   实现 `siftUp` (上浮) 和 `siftDown` (下沉) 的逻辑模拟。
    *   用 SVG 或 Flexbox 绘制堆结构。
6.  **注册路由**: 在 `src/App.tsx` 中添加路由。
7.  **添加入口**: 在 `src/pages/Home.tsx` 中添加卡片。
8.  **国际化**: 在 `src/locales/zh.json` 和 `en.json` 添加翻译。

## 5. 最佳实践与约定

*   **Hook 优先**: 所有的逻辑尽量封装在组件内部或自定义 Hook 中。
*   **不可变数据**: 修改 State 时，始终创建新对象/数组（例如 `setList([...list, newItem])`），不要直接修改引用，否则动画可能不触发。
*   **ID 的重要性**: 渲染列表时，`key` 必须是唯一的且稳定的 ID（如 UUID 或自增 ID），**绝对不要用数组索引 (index) 作为 key**，否则 Framer Motion 的动画会乱掉。
*   **代码注释**: Demo 中的逻辑代码（模拟 Java 行为的部分）请加上注释，解释这是在模拟 Java 的哪一步。

## 6. 贡献与反馈

如果你在开发过程中遇到架构设计上的疑问，欢迎在 Issue 中提出。我们鼓励通过 Pull Request 分享你的创意！
