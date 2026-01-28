import React from 'react';
import { useTranslation } from 'react-i18next';

interface LabLayoutProps {
  title: string;
  description?: string;
  guide: React.ReactNode;
  demo: React.ReactNode;
}

export const LabLayout: React.FC<LabLayoutProps> = ({ 
  title, 
  description, 
  guide, 
  demo 
}) => {
  const { t } = useTranslation();

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {description && <p className="text-gray-600 mt-2">{description}</p>}
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        {/* Left: Guide Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-y-auto flex flex-col h-[500px] lg:h-full">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 sticky top-0 z-10 backdrop-blur-sm">
            <h2 className="font-semibold text-gray-700 flex items-center gap-2">
              📖 {t('labs.common.guide')}
            </h2>
          </div>
          <div className="p-6 prose prose-blue max-w-none">
            {guide}
          </div>
        </div>

        {/* Right: Demo Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[600px] lg:h-full order-first lg:order-last">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 sticky top-0 z-10 backdrop-blur-sm flex justify-between items-center">
            <h2 className="font-semibold text-gray-700 flex items-center gap-2">
              🧪 {t('labs.common.lab')}
            </h2>
          </div>
          <div className="flex-1 overflow-y-auto p-3 md:p-6 bg-slate-50 relative">
            {demo}
          </div>
        </div>
      </div>
    </div>
  );
};
