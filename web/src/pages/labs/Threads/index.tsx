import React from 'react';
import { LabLayout } from '../../../components/LabLayout/LabLayout';
import { Guide } from './Guide';
import { Demo } from './Demo';

export const ThreadsLab: React.FC = () => {
  return (
    <LabLayout
      title="多线程状态 (Thread States)"
      description="探索 Java 线程的生命周期，可视化线程在 New, Runnable, Waiting, Blocked, Terminated 等状态之间的转换。"
      guide={<Guide />}
      demo={<Demo />}
    />
  );
};
