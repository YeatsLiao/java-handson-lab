
const fs = require('fs');
const path = require('path');

const modules = [
  { dir: 'Polymorphism', name: 'Polymorphism', title: '继承与多态', desc: '理解 Java 类的继承机制与多态特性' },
  { dir: 'Interfaces', name: 'Interfaces', title: '接口与实现', desc: '掌握接口定义与实现类的关系' },
  { dir: 'StaticMembers', name: 'StaticMembers', title: '静态成员', desc: '深入理解 static 关键字与类加载机制' },
  { dir: 'ArrayList', name: 'ArrayList', title: 'ArrayList 扩容', desc: '可视化 ArrayList 的动态扩容过程' },
  { dir: 'LinkedList', name: 'LinkedList', title: 'LinkedList', desc: '对比 ArrayList 与 LinkedList 的操作差异' },
  { dir: 'HashMap', name: 'HashMap', title: 'HashMap 原理', desc: '探索 HashMap 的哈希冲突与链表/红黑树转换' },
  { dir: 'Exceptions', name: 'Exceptions', title: '异常处理', desc: 'Java 异常体系与 try-catch-finally 执行流程' },
  { dir: 'Threads', name: 'Threads', title: '多线程状态', desc: '观察线程生命周期与状态转换' },
  { dir: 'Locks', name: 'Locks', title: '锁机制', desc: '理解 synchronized 与 ReentrantLock 的工作原理' },
  { dir: 'GC', name: 'GC', title: 'GC 垃圾回收', desc: '模拟垃圾回收算法与对象生命周期' }
];

const baseDir = path.join(__dirname, 'src/pages/labs');

modules.forEach(mod => {
  const modDir = path.join(baseDir, mod.dir);
  if (!fs.existsSync(modDir)) {
    fs.mkdirSync(modDir);
    console.log(`Created directory: ${modDir}`);
  }

  // index.tsx
  const indexContent = `import React from 'react';
import { LabLayout } from '../../components/LabLayout/LabLayout';
import { Guide } from './Guide';
import { Demo } from './Demo';

export const ${mod.name}: React.FC = () => {
  return (
    <LabLayout
      title="${mod.title}"
      description="${mod.desc}"
      guide={<Guide />}
      demo={<Demo />}
    />
  );
};
`;
  fs.writeFileSync(path.join(modDir, 'index.tsx'), indexContent);

  // Guide.tsx
  const guideContent = `import React from 'react';

export const Guide: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">实验目标</h3>
        <p className="text-gray-600">
          通过交互式实验，深入理解 ${mod.title} 的核心概念与运行机制。
        </p>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800">核心知识点</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li><strong>概念一</strong>: 待补充...</li>
          <li><strong>概念二</strong>: 待补充...</li>
        </ul>
      </div>
    </div>
  );
};
`;
  fs.writeFileSync(path.join(modDir, 'Guide.tsx'), guideContent);

  // Demo.tsx
  const demoContent = `import React from 'react';
import { motion } from 'framer-motion';

export const Demo: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center text-gray-400 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 m-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <div className="text-4xl">🚧</div>
        <h3 className="text-lg font-semibold text-gray-600">开发中</h3>
        <p className="text-sm">该实验模块正在建设中...</p>
      </motion.div>
    </div>
  );
};
`;
  fs.writeFileSync(path.join(modDir, 'Demo.tsx'), demoContent);

  console.log(`Generated files for ${mod.name}`);
});
