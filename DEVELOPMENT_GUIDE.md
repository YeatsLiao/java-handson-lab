# Java Hands-on Lab Development Guide

[简体中文](./DEVELOPMENT_GUIDE_zh-CN.md)

Welcome to the **Java Hands-on Lab** development team! This document aims to help you understand the project's architecture, code organization, and core development workflows. Whether you want to fix a bug or contribute a new lab case, please read this document before you start.

## 1. Tech Stack Overview

This project is built with a modern React tech stack:

*   **Core Framework**: [React 19](https://react.dev/) - Utilizing the latest Hooks and functional component patterns.
*   **Language**: [TypeScript](https://www.typescriptlang.org/) - Strong typing ensures code robustness and maintainability.
*   **Build Tool**: [Vite](https://vitejs.dev/) - Blazing fast development server and build tool.
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) - Utility-first CSS for rapid UI development with Dark Mode support.
*   **Animation**: [Framer Motion](https://www.framer.com/motion/) - A powerful declarative animation library for creating effects like memory block movements and stack push/pop.
*   **Internationalization**: [i18next](https://www.i18next.com/) - Complete bilingual (English/Chinese) support.

## 2. Architecture & Directory Structure

The code resides in the `web/src` directory, structured clearly and modularly:

```text
src/
├── components/        # Shared Components
│   ├── Layout/        # Global Layout (Sidebar, Top Navigation)
│   ├── LabLayout/     # Standard Lab Layout (Guide on the left, Demo on the right)
│   └── ui/            # Generic UI Components (Buttons, Cards, etc.)
├── context/           # Global Context
│   └── ThemeContext.tsx # Theme Management (Dark/Light mode toggle)
├── locales/           # i18n Resource Files
│   ├── zh.json        # Chinese Translations
│   └── en.json        # English Translations
├── pages/             # Page Components
│   ├── Home.tsx       # Home Page
│   └── labs/          # [CORE] All Lab Modules reside here
│       ├── ArrayList/ # ArrayList Lab
│       ├── Stack/     # Stack Lab
│       └── ...
├── App.tsx            # Router Configuration
└── main.tsx           # Application Entry Point
```

## 3. Lab Anatomy

This is the core design of the project. **Each Lab is an independent folder** located under `src/pages/labs/`. To maintain consistency and maintainability, we adhere to the following strict file structure:

A standard Lab folder (e.g., `src/pages/labs/MyNewLab/`) must contain three files:

### 3.1 `index.tsx` - Entry File

This is the container for the lab, mainly responsible for:
1.  Defining the lab's unique ID and title.
2.  Wrapping `Guide` and `Demo` using the `LabLayout` component.

**Code Example:**
```tsx
import React from 'react';
import { LabLayout } from '../../../components/LabLayout/LabLayout';
import { Guide } from './Guide';
import { Demo } from './Demo';

const MyNewLab: React.FC = () => {
  return (
    <LabLayout 
      title="My New Lab"
      guide={<Guide />} // Left: Educational Guide
      demo={<Demo />}   // Right: Interactive Demo
    />
  );
};

export default MyNewLab;
```

### 3.2 `Guide.tsx` - Educational Guide

This component is responsible for presenting theoretical knowledge.
*   **Design Principle**: Pure static presentation, avoid complex logic.
*   **Bilingual Support**: For clarity, we usually split Chinese and English content into two sub-components: `GuideZh` and `GuideEn`, and render them dynamically based on `i18n.language`.
*   **Styling**: Use Tailwind CSS for typography. Use dark background containers for code blocks.

**Code Pattern:**
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

### 3.3 `Demo.tsx` - Interactive Demo (The Core)

This is the most interesting part! You need to simulate Java execution logic using TypeScript and React, and visualize it.

#### Core Concept: Logic Simulation & View Driving
We are not actually running a JVM in the browser; we are **simulating** JVM behavior.
For example, to simulate a Stack:
1.  **State (Data Layer)**: Use `useState` to define an array `const [stack, setStack] = useState([])`.
2.  **Logic (Logic Layer)**: Write a `push` function that not only modifies the array but also records logs.
3.  **View (View Layer)**: Use `map` to render the array, where each element represents a "memory block".

#### Animation Guide (Framer Motion)
To make the process vivid, we extensively use `framer-motion`.
*   **Layout Animation**: Add the `layout` prop to elements within a list container. React will automatically calculate and play smooth movement animations when the array order changes.
*   **Enter/Exit Animation**: Wrap the list with `<AnimatePresence>` and set `initial` (state before enter), `animate` (final state), and `exit` (state after exit) props on the elements.

**Code Example:**
```tsx
<AnimatePresence>
  {stack.map(item => (
    <motion.div
      key={item.id}
      layout // Automatic layout animation
      initial={{ opacity: 0, y: -20 }} // Fade in from top
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5 }} // Shrink and fade out
      className="border p-2"
    >
      {item.value}
    </motion.div>
  ))}
</AnimatePresence>
```

#### Dark Mode Adaptation
When writing CSS classes, you must consider both Light and Dark modes. Use the `dark:` prefix.
*   **Background**: `bg-white dark:bg-gray-800`
*   **Text**: `text-gray-900 dark:text-gray-100`
*   **Border**: `border-gray-200 dark:border-gray-700`

## 4. Development Workflow (Step-by-Step)

Suppose you want to develop a new lab named `PriorityQueue`:

1.  **Create Directory**: `src/pages/labs/PriorityQueue`.
2.  **Copy Template**: Copy the three files from the `Stack` lab to the new directory.
3.  **Rename & Clean**: Rename the component in `index.tsx` to `PriorityQueue`.
4.  **Implement Guide**: Write documentation about Binary Heap principles.
5.  **Implement Demo**:
    *   Define `HeapNode` interface.
    *   Simulate `siftUp` and `siftDown` logic.
    *   Draw the heap structure using SVG or Flexbox.
6.  **Register Route**: Add the route in `src/App.tsx`.
7.  **Add Entry**: Add the card in `src/pages/Home.tsx`.
8.  **i18n**: Add translations in `src/locales/zh.json` and `en.json`.

## 5. Best Practices & Conventions

*   **Hooks First**: Encapsulate logic within components or custom Hooks whenever possible.
*   **Immutable Data**: Always create new objects/arrays when modifying State (e.g., `setList([...list, newItem])`). Do not modify references directly, or animations may not trigger.
*   **Importance of Keys**: When rendering lists, `key` must be a unique and stable ID (like UUID or auto-increment ID). **NEVER use array index as key**, otherwise Framer Motion animations will break.
*   **Comments**: Please add comments to the logic code in Demo (the part simulating Java behavior) explaining which step of Java execution is being simulated.

## 6. Contribution & Feedback

If you have questions about the architectural design during development, feel free to open an Issue. We encourage you to share your ideas via Pull Requests!
