import React from 'react';
import { LabLayout } from '../../../components/LabLayout/LabLayout';
import { Guide } from './Guide.tsx';
import { Demo } from './Demo.tsx';

export const FlowControl: React.FC = () => {
  return (
    <LabLayout
      title="流程控制 (Loops)"
      description="可视化 for 循环的执行流程，观察计数器变量的变化与循环条件的判断。"
      guide={<Guide />}
      demo={<Demo />}
    />
  );
};
