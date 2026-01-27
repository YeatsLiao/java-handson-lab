import React from 'react';
import { LabLayout } from '../../../components/LabLayout/LabLayout';
import { Guide } from './Guide';
import { Demo } from './Demo';

export const StaticMembers: React.FC = () => {
  return (
    <LabLayout
      title="静态成员 (Static Members)"
      description="可视化静态变量与静态方法的内存分布，理解类级别成员与对象级别成员的区别。"
      guide={<Guide />}
      demo={<Demo />}
    />
  );
};
