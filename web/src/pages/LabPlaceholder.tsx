import React from 'react';
import { useParams } from 'react-router-dom';
import { Construction } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const LabPlaceholder: React.FC = () => {
  const { labId } = useParams();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8">
      <div className="bg-gray-100 p-6 rounded-full mb-6 animate-pulse">
        <Construction size={64} className="text-gray-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {t('labs.placeholder.title', { name: labId })}
      </h2>
      <p className="text-gray-500 max-w-md">
        {t('labs.placeholder.description')}
      </p>
    </div>
  );
};
