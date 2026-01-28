import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Cpu, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Home: React.FC = () => {
  const { t } = useTranslation();

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
            {t('home.hero.title_prefix')} <span className="text-blue-600">{t('home.hero.title_highlight')}</span> {t('home.hero.title_suffix')}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {t('home.hero.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link 
            to="/labs/primitive-types" 
            className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 flex items-center gap-2"
          >
            {t('home.hero.start')} <ArrowRight size={18} />
          </Link>
          <a 
            href="https://github.com/YeatsLiao/java-handson-lab" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-3 bg-white text-gray-700 border border-gray-200 rounded-full font-semibold hover:bg-gray-50 transition-colors"
          >
            {t('home.hero.source')}
          </a>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto px-4">
        <FeatureCard 
          icon={<Layers className="text-purple-500" size={32} />}
          title={t('home.features.memory.title')}
          desc={t('home.features.memory.desc')}
        />
        <FeatureCard 
          icon={<Cpu className="text-blue-500" size={32} />}
          title={t('home.features.flow.title')}
          desc={t('home.features.flow.desc')}
        />
        <FeatureCard 
          icon={<Code className="text-green-500" size={32} />}
          title={t('home.features.interactive.title')}
          desc={t('home.features.interactive.desc')}
        />
      </div>

      {/* Quick Start Links */}
      <div className="border-t border-gray-100 pt-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">{t('home.sections.title')}</h2>
        
        <div className="space-y-10">
          {/* 阶段一：基础 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
              <h3 className="text-xl font-bold text-gray-700">{t('sidebar.categories.basics')}</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <QuickLink to="/labs/primitive-types" label={t('sidebar.items.primitiveTypes')} color="bg-blue-50 text-blue-700 hover:bg-blue-100" />
              <QuickLink to="/labs/references" label={t('sidebar.items.references')} color="bg-blue-50 text-blue-700 hover:bg-blue-100" />
              <QuickLink to="/labs/stack" label={t('sidebar.items.stack')} color="bg-blue-50 text-blue-700 hover:bg-blue-100" />
              <QuickLink to="/labs/string-pool" label={t('sidebar.items.stringPool')} color="bg-blue-50 text-blue-700 hover:bg-blue-100" />
              <QuickLink to="/labs/flow-control" label={t('sidebar.items.flowControl')} color="bg-blue-50 text-blue-700 hover:bg-blue-100" />
            </div>
          </section>

          {/* 阶段二：面向对象 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
              <h3 className="text-xl font-bold text-gray-700">{t('sidebar.categories.oop')}</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <QuickLink to="/labs/polymorphism" label={t('sidebar.items.polymorphism')} color="bg-indigo-50 text-indigo-700 hover:bg-indigo-100" />
              <QuickLink to="/labs/interfaces" label={t('sidebar.items.interfaces')} color="bg-indigo-50 text-indigo-700 hover:bg-indigo-100" />
              <QuickLink to="/labs/static-members" label={t('sidebar.items.staticMembers')} color="bg-indigo-50 text-indigo-700 hover:bg-indigo-100" />
            </div>
          </section>

          {/* 阶段三：集合框架 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
              <h3 className="text-xl font-bold text-gray-700">{t('sidebar.categories.collections')}</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <QuickLink to="/labs/arraylist" label={t('sidebar.items.arrayList')} color="bg-emerald-50 text-emerald-700 hover:bg-emerald-100" />
              <QuickLink to="/labs/linkedlist" label={t('sidebar.items.linkedList')} color="bg-emerald-50 text-emerald-700 hover:bg-emerald-100" />
              <QuickLink to="/labs/hashmap" label={t('sidebar.items.hashMap')} color="bg-emerald-50 text-emerald-700 hover:bg-emerald-100" />
            </div>
          </section>

          {/* 阶段四：进阶与并发 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
              <h3 className="text-xl font-bold text-gray-700">{t('sidebar.categories.advanced')}</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <QuickLink to="/labs/exceptions" label={t('sidebar.items.exceptions')} color="bg-orange-50 text-orange-700 hover:bg-orange-100" />
              <QuickLink to="/labs/threads" label={t('sidebar.items.threads')} color="bg-orange-50 text-orange-700 hover:bg-orange-100" />
              <QuickLink to="/labs/locks" label={t('sidebar.items.locks')} color="bg-orange-50 text-orange-700 hover:bg-orange-100" />
              <QuickLink to="/labs/gc" label={t('sidebar.items.gc')} color="bg-orange-50 text-orange-700 hover:bg-orange-100" />
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
