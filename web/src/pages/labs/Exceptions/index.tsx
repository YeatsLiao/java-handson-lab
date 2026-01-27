import React from 'react';
import { LabLayout } from '../../../components/LabLayout/LabLayout';
import { Guide } from './Guide';
import { Demo } from './Demo';

export const ExceptionsLab: React.FC = () => {
  return (
    <LabLayout
      title="异常处理机制 (Exception Handling)"
      description="可视化 Java 异常处理流程，理解 try-catch-finally 执行顺序及异常抛出机制。"
      guide={<Guide />}
      demo={<Demo />}
    />
  );
};
