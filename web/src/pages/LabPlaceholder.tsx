import React from 'react';
import { useParams } from 'react-router-dom';
import { Construction } from 'lucide-react';

export const LabPlaceholder: React.FC = () => {
  const { labId } = useParams();

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8">
      <div className="bg-gray-100 p-6 rounded-full mb-6 animate-pulse">
        <Construction size={64} className="text-gray-400" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        "{labId}" 实验正在开发中
      </h2>
      <p className="text-gray-500 max-w-md">
        我们正在努力构建这个交互式实验。请稍后回来查看，或先体验其他已完成的模块。
      </p>
    </div>
  );
};
