import React from 'react';
import { LabLayout } from '../../../components/LabLayout/LabLayout';
import { Guide } from './Guide.tsx';
import { Demo } from './Demo.tsx';

export const Interfaces: React.FC = () => {
  return (
    <LabLayout
      title="接口与实现 (Interfaces)"
      description="可视化接口定义规范与多重实现，理解接口在解耦中的作用。"
      guide={<Guide />}
      demo={<Demo />}
    />
  );
};
