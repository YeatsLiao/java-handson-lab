import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  Menu, X, Home, Box, Cpu, Share2, 
  Layers, Database, Zap, Repeat, 
  GitBranch, Code, Moon, Globe, Github
} from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

interface SidebarItem {
  key: string; // Translation key for name
  path: string;
  icon?: React.ReactNode;
  category?: string; // Translation key for category
}

const menuItems: SidebarItem[] = [
  { key: 'sidebar.home', path: '/', icon: <Home size={18} /> },
  
  // 阶段一：基础
  { key: 'sidebar.items.primitiveTypes', path: '/labs/primitive-types', category: 'sidebar.categories.basics', icon: <Box size={18} /> },
  { key: 'sidebar.items.references', path: '/labs/references', category: 'sidebar.categories.basics', icon: <Share2 size={18} /> },
  { key: 'sidebar.items.stack', path: '/labs/stack', category: 'sidebar.categories.basics', icon: <Layers size={18} /> },
  { key: 'sidebar.items.stringPool', path: '/labs/string-pool', category: 'sidebar.categories.basics', icon: <Database size={18} /> },
  { key: 'sidebar.items.flowControl', path: '/labs/flow-control', category: 'sidebar.categories.basics', icon: <Repeat size={18} /> },

  // 阶段二：OOP
  { key: 'sidebar.items.polymorphism', path: '/labs/polymorphism', category: 'sidebar.categories.oop', icon: <GitBranch size={18} /> },
  { key: 'sidebar.items.interfaces', path: '/labs/interfaces', category: 'sidebar.categories.oop', icon: <Cpu size={18} /> },
  { key: 'sidebar.items.staticMembers', path: '/labs/static-members', category: 'sidebar.categories.oop', icon: <Code size={18} /> },

  // 阶段三：集合
  { key: 'sidebar.items.arrayList', path: '/labs/arraylist', category: 'sidebar.categories.collections', icon: <Layers size={18} /> },
  { key: 'sidebar.items.linkedList', path: '/labs/linkedlist', category: 'sidebar.categories.collections', icon: <Layers size={18} /> },
  { key: 'sidebar.items.hashMap', path: '/labs/hashmap', category: 'sidebar.categories.collections', icon: <Database size={18} /> },

  // 阶段四：进阶
  { key: 'sidebar.items.exceptions', path: '/labs/exceptions', category: 'sidebar.categories.advanced', icon: <Zap size={18} /> },
  { key: 'sidebar.items.threads', path: '/labs/threads', category: 'sidebar.categories.advanced', icon: <Zap size={18} /> },
  { key: 'sidebar.items.locks', path: '/labs/locks', category: 'sidebar.categories.advanced', icon: <Zap size={18} /> },
  { key: 'sidebar.items.gc', path: '/labs/gc', category: 'sidebar.categories.advanced', icon: <Zap size={18} /> },
];

export const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(newLang);
  };

  // Group items by category
  const groupedItems = menuItems.reduce((acc, item) => {
    const category = item.category || 'Main';
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as Record<string, SidebarItem[]>);

  const categories = ['Main', 'sidebar.categories.basics', 'sidebar.categories.oop', 'sidebar.categories.collections', 'sidebar.categories.advanced'];

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
      <motion.aside
        className={clsx(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 shadow-sm md:relative transform transition-transform duration-300 ease-in-out flex flex-col",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <Code className="text-blue-600" />
            {t('sidebar.title')}
          </h1>
          <p className="text-xs text-gray-500 mt-1">{t('sidebar.subtitle')}</p>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-thin scrollbar-thumb-gray-200">
          {categories.map((cat) => (
            groupedItems[cat] && (
              <div key={cat}>
                {cat !== 'Main' && (
                  <h3 className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {t(cat)}
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
                      {t(item.key)}
                    </NavLink>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>

        <div className="p-4 border-t border-gray-100">
          <div className="flex justify-center gap-4 mb-4">
              <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors" title={t('sidebar.tooltips.toggleTheme')}>
                <Moon size={18} />
              </button>
              <button 
                onClick={toggleLanguage}
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors" 
                title={t('sidebar.tooltips.toggleLang')}
              >
                <Globe size={18} />
              </button>
              <a 
                href="https://github.com/YeatsLiao/java-handson-lab" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors"
                title={t('sidebar.tooltips.github')}
              >
                <Github size={18} />
              </a>
          </div>
          <p className="text-xs text-center text-gray-400">
            {t('sidebar.footer.version')}
          </p>
        </div>
      </motion.aside>

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
