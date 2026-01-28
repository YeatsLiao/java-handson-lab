import React from 'react';
import { useTranslation } from 'react-i18next';
import { LabLayout } from '../../../components/LabLayout/LabLayout';
import { Guide } from './Guide';
import { Demo } from './Demo';

export const LocksLab: React.FC = () => {
  const { t } = useTranslation();
  return (
    <LabLayout
      title={t('labs.locks.title')}
      description={t('labs.locks.desc')}
      guide={<Guide />}
      demo={<Demo />}
    />
  );
};
