import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  Menu, X, Home, Box, Cpu, Share2, 
  Layers, Database, Zap, Repeat, 
  GitBranch, Code, Moon, Globe, Github
} from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface SidebarItem {
  name: string;
  path: string;
  icon?: React.ReactNode;
  category?: string;
}

const menuItems: SidebarItem[] = [
  { name: '首页', path: '/', icon: <Home size={18} /> },
  
  // 阶段一：基础
  { name: '基础数据类型', path: '/labs/primitive-types', category: 'Java 基础', icon: <Box size={18} /> },
  { name: '引用与对象', path: '/labs/references', category: 'Java 基础', icon: <Share2 size={18} /> },
  { name: '方法调用栈', path: '/labs/stack', category: 'Java 基础', icon: <Layers size={18} /> },
  { name: '字符串常量池', path: '/labs/string-pool', category: 'Java 基础', icon: <Database size={18} /> },
  { name: '流程控制', path: '/labs/flow-control', category: 'Java 基础', icon: <Repeat size={18} /> },

  // 阶段二：OOP
  { name: '继承与多态', path: '/labs/polymorphism', category: '面向对象', icon: <GitBranch size={18} /> },
  { name: '接口与实现', path: '/labs/interfaces', category: '面向对象', icon: <Cpu size={18} /> },
  { name: '静态成员', path: '/labs/static-members', category: '面向对象', icon: <Code size={18} /> },

  // 阶段三：集合
  { name: 'ArrayList 扩容', path: '/labs/arraylist', category: '集合框架', icon: <Layers size={18} /> },
  { name: 'LinkedList', path: '/labs/linkedlist', category: '集合框架', icon: <Layers size={18} /> },
  { name: 'HashMap 原理', path: '/labs/hashmap', category: '集合框架', icon: <Database size={18} /> },

  // 阶段四：进阶
  { name: '异常处理', path: '/labs/exceptions', category: '进阶与并发', icon: <Zap size={18} /> },
  { name: '多线程状态', path: '/labs/threads', category: '进阶与并发', icon: <Zap size={18} /> },
  { name: '锁机制', path: '/labs/locks', category: '进阶与并发', icon: <Zap size={18} /> },
  { name: 'GC 垃圾回收', path: '/labs/gc', category: '进阶与并发', icon: <Zap size={18} /> },
];

export const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const location = useLocation();

  // Group items by category
  const groupedItems = menuItems.reduce((acc, item) => {
    const category = item.category || 'Main';
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as Record<string, SidebarItem[]>);

  const categories = ['Main', 'Java 基础', '面向对象', '集合框架', '进阶与并发'];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-white rounded-md shadow-md text-gray-700 hover:text-blue-600"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      {/* <AnimatePresence mode="wait"> */}
        <motion.aside
          className={clsx(
            "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 shadow-sm md:relative transform transition-transform duration-300 ease-in-out flex flex-col",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          )}
        >
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-xl font-bold text-blue-600 flex items-center gap-2">
              <Code className="text-blue-600" />
              Java Hands-on
            </h1>
            <p className="text-xs text-gray-500 mt-1">交互式学习实验室</p>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-thin scrollbar-thumb-gray-200">
            {categories.map((cat) => (
              groupedItems[cat] && (
                <div key={cat}>
                  {cat !== 'Main' && (
                    <h3 className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {cat}
                    </h3>
                  )}
                  <div className="space-y-1">
                    {groupedItems[cat].map((item) => (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) => clsx(
                          "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                          isActive 
                            ? "bg-blue-50 text-blue-600" 
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        )}
                      >
                        {item.icon}
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>

          <div className="p-4 border-t border-gray-100">
            <div className="flex justify-center gap-4 mb-4">
               <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors" title="切换主题">
                 <Moon size={18} />
               </button>
               <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors" title="切换语言">
                 <Globe size={18} />
               </button>
               <a 
                 href="https://github.com/YeatsLiao/java-handson-lab" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors"
                 title="GitHub 源码"
               >
                 <Github size={18} />
               </a>
            </div>
            <p className="text-xs text-center text-gray-400">
              v1.0.0 | Built with React
            </p>
          </div>
        </motion.aside>
      {/* </AnimatePresence> */}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative w-full pt-16 md:pt-0">
        <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-full">
           <Outlet />
        </div>
      </main>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};
