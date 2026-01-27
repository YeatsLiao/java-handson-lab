import React from 'react';
import { LabLayout } from '../../../components/LabLayout/LabLayout';
import { Guide } from './Guide';
import { Demo } from './Demo';

export const LocksLab: React.FC = () => {
  return (
    <LabLayout
      title="锁机制与线程安全 (Locks & Safety)"
      description="演示多线程环境下的竞态条件 (Race Condition)，以及如何使用 synchronized 关键字保证线程安全。"
      guide={<Guide />}
      demo={<Demo />}
    />
  );
};
