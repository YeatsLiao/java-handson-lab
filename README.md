# Java Hands-on Lab Interactive Learning Platform

[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-purple)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-cyan)](https://tailwindcss.com/)

[English](./README.md) | [简体中文](./README_zh-CN.md)

**Java Hands-on Lab** is an interactive, visual platform for learning Java. By leveraging web-based graphical interfaces and vivid animations, it transforms abstract Java concepts (such as Memory Models, Garbage Collection, Thread Concurrency, Collection Resizing) into intuitive visual experiences, helping beginners deeply understand the internal mechanisms of Java.

## ✨ Features

- **Visual Learning**: Dynamically demonstrate Stack & Heap memory allocation, reference relationships, and garbage collection processes.
- **Interactive Labs**: More than just reading—manipulate variables, threads, and collections to observe logic changes behind the code.
- **Bilingual Support**: Full support for English and Chinese interfaces and documentation.
- **Dark Mode**: Perfectly adapted for both day and night reading experiences.
- **Modern Tech Stack**: Built with the latest React 19 and Tailwind CSS v4 for a silky-smooth experience.

## 📂 Project Structure

The core code resides in the `web` directory, following a standard modern frontend engineering structure:

```text
java-handson-lab/
├── web/                   # Frontend root directory
│   ├── src/
│   │   ├── components/    # Shared components (Layout, Navigation, etc.)
│   │   ├── context/       # Global state (Theme, Language)
│   │   ├── locales/       # i18n resources (en.json, zh.json)
│   │   ├── pages/
│   │   │   ├── labs/      # Core Lab Modules (Each folder is a lab)
│   │   │   │   ├── ArrayList/     # ArrayList Resizing Lab
│   │   │   │   ├── LinkedList/    # LinkedList Lab
│   │   │   │   ├── Stack/         # Stack Memory Lab
│   │   │   │   ├── ...            # More labs...
│   │   │   │   │   ├── Demo.tsx   # Interactive Component (Core Logic)
│   │   │   │   │   ├── Guide.tsx  # Guide Component (Theory)
│   │   │   │   │   └── index.tsx  # Lab Entry Point
│   │   │   └── Home.tsx   # Home Page
│   │   ├── App.tsx        # Router Configuration
│   │   └── main.tsx       # Entry Point
│   ├── package.json
│   └── vite.config.ts
└── PROJECT_PLAN.md        # Project Plan Document
```

## 🚀 Quick Start (For Beginners)

If you are new to programming and want to run this project locally, follow these steps:

### 1. Prerequisites
You need to install **Node.js**.
- Visit [Node.js Official Website](https://nodejs.org/) to download and install the LTS version (v18 or higher recommended).
- After installation, open your terminal (Win+R -> cmd on Windows), and type `node -v` to check if it's installed successfully.

### 2. Download Code
You can clone the repository using Git or download the ZIP archive directly.

```bash
# If you have Git installed
git clone https://github.com/your-username/java-handson-lab.git
```

### 3. Install & Run
Open your terminal (or VS Code terminal), navigate to the `web` directory, install dependencies, and start the project.

```bash
# 1. Enter the web directory
cd java-handson-lab/web

# 2. Install dependencies (This may take a few minutes)
npm install

# 3. Start the development server
npm run dev
```

Once started, the terminal will show a URL (usually `http://localhost:5173`). Open this URL in your browser to start learning!

## 🛠️ Technical Implementation & Guide

This project uses **React** as the core framework and organizes each lab using a **Component-based** architecture.

### Core Architecture
Each Lab is an independent module located under `src/pages/labs/`. A standard lab consists of three files:

1.  **`index.tsx`**: The entry point. It uses `LabLayout` to wrap the content, integrating the Guide and Demo, and defining the lab title.
2.  **`Guide.tsx`**: The educational guide.
    -   Displays theoretical knowledge.
    -   Typically contains `GuideZh` (Chinese) and `GuideEn` (English) components, switching dynamically based on `i18n.language`.
    -   Uses Tailwind CSS for typography and styling.
3.  **`Demo.tsx`**: The interactive demonstration.
    -   **State Management**: Uses `useState` to manage lab state (e.g., variable values, memory block positions, thread states).
    -   **Animation**: Uses `framer-motion` for smooth transitions (e.g., pushing to stack, moving linked list nodes).
    -   **Logic Simulation**: Simulates Java execution logic using TypeScript code (e.g., simulating HashMap hash calculation).

### Contribution Guide

If you want to add a new Java lab (e.g., "PriorityQueue"), follow these steps:

1.  **Create Directory**: Create a new folder `PriorityQueue` under `src/pages/labs/`.
2.  **Create Files**: Copy `index.tsx`, `Guide.tsx`, and `Demo.tsx` from another lab as templates.
3.  **Implement**:
    -   Modify `Guide.tsx` to explain the PriorityQueue principles.
    -   Modify `Demo.tsx` to implement visualization logic for Heap insertion/deletion.
    -   Modify `index.tsx` to update the title and ID.
4.  **Register Route**:
    -   Import the new page in `src/App.tsx` and configure the route `/lab/priority-queue`.
    -   Add the new lab card to the list in `src/pages/Home.tsx`.
5.  **Add Translations**: Add corresponding translation keys in `zh.json` and `en.json` under `src/locales/`.

---

## 🤝 Contributing

Issues and Pull Requests are welcome! Whether it's fixing bugs, improving documentation, or adding new lab cases, your contribution will help more people learn Java better.

## 📄 License

MIT License
