import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Cpu, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="space-y-12 py-8">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight sm:text-6xl mb-4">
            Java <span className="text-blue-600">可视化</span> 实验室
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            告别枯燥的控制台输出。通过交互式动画和实时内存模型，
            直观理解 Java 核心机制、数据结构与并发原理。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center gap-4"
        >
          <Link 
            to="/labs/primitive-types" 
            className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center gap-2"
          >
            开始学习 <ArrowRight size={18} />
          </Link>
          <a 
            href="https://github.com/YeatsLiao/java-handson-lab" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-3 bg-white text-gray-700 border border-gray-200 rounded-full font-semibold hover:bg-gray-50 transition-colors"
          >
            查看源码
          </a>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <FeatureCard 
          icon={<Layers className="text-purple-500" size={32} />}
          title="内存模型可视化"
          desc="动态展示 Stack（栈）与 Heap（堆）的分配过程，彻底搞懂引用传递。"
        />
        <FeatureCard 
          icon={<Cpu className="text-blue-500" size={32} />}
          title="流程控制动画"
          desc="代码行高亮与变量实时追踪，直观呈现循环、递归与多线程切换。"
        />
        <FeatureCard 
          icon={<Code className="text-green-500" size={32} />}
          title="交互式实验"
          desc="不仅是看，更要动手。调整参数、模拟异常、触发 GC，观察程序反应。"
        />
      </div>

      {/* Quick Start Links */}
      <div className="border-t border-gray-100 pt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">探索实验模块</h2>
        
        <div className="space-y-10">
          {/* 阶段一：基础 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
              <h3 className="text-xl font-bold text-gray-700">Java 基础</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <QuickLink to="/labs/primitive-types" label="基础数据类型" color="bg-blue-50 text-blue-700 hover:bg-blue-100" />
              <QuickLink to="/labs/references" label="引用与对象" color="bg-blue-50 text-blue-700 hover:bg-blue-100" />
              <QuickLink to="/labs/stack" label="方法调用栈" color="bg-blue-50 text-blue-700 hover:bg-blue-100" />
              <QuickLink to="/labs/string-pool" label="字符串常量池" color="bg-blue-50 text-blue-700 hover:bg-blue-100" />
              <QuickLink to="/labs/flow-control" label="流程控制" color="bg-blue-50 text-blue-700 hover:bg-blue-100" />
            </div>
          </section>

          {/* 阶段二：面向对象 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
              <h3 className="text-xl font-bold text-gray-700">面向对象 (OOP)</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <QuickLink to="/labs/polymorphism" label="继承与多态" color="bg-indigo-50 text-indigo-700 hover:bg-indigo-100" />
              <QuickLink to="/labs/interfaces" label="接口与实现" color="bg-indigo-50 text-indigo-700 hover:bg-indigo-100" />
              <QuickLink to="/labs/static-members" label="静态成员" color="bg-indigo-50 text-indigo-700 hover:bg-indigo-100" />
            </div>
          </section>

          {/* 阶段三：集合框架 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
              <h3 className="text-xl font-bold text-gray-700">集合框架</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <QuickLink to="/labs/arraylist" label="ArrayList 扩容" color="bg-emerald-50 text-emerald-700 hover:bg-emerald-100" />
              <QuickLink to="/labs/linkedlist" label="LinkedList 链表" color="bg-emerald-50 text-emerald-700 hover:bg-emerald-100" />
              <QuickLink to="/labs/hashmap" label="HashMap 原理" color="bg-emerald-50 text-emerald-700 hover:bg-emerald-100" />
            </div>
          </section>

          {/* 阶段四：进阶与并发 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
              <h3 className="text-xl font-bold text-gray-700">进阶与并发</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <QuickLink to="/labs/exceptions" label="异常处理" color="bg-orange-50 text-orange-700 hover:bg-orange-100" />
              <QuickLink to="/labs/threads" label="多线程状态" color="bg-orange-50 text-orange-700 hover:bg-orange-100" />
              <QuickLink to="/labs/locks" label="锁与线程安全" color="bg-orange-50 text-orange-700 hover:bg-orange-100" />
              <QuickLink to="/labs/gc" label="GC 垃圾回收" color="bg-orange-50 text-orange-700 hover:bg-orange-100" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="mb-4 bg-gray-50 w-12 h-12 rounded-xl flex items-center justify-center">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
  </div>
);

const QuickLink = ({ to, label, color }: { to: string, label: string, color: string }) => (
  <Link 
    to={to} 
    className={`p-4 rounded-xl text-center font-medium transition-colors ${color}`}
  >
    {label}
  </Link>
);
