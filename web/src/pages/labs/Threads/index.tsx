import React from 'react';
import { useTranslation } from 'react-i18next';
import { LabLayout } from '../../../components/LabLayout/LabLayout';
import { Guide } from './Guide';
import { Demo } from './Demo';

export const ThreadsLab: React.FC = () => {
  const { t } = useTranslation();
  return (
    <LabLayout
      title={t('labs.threads.title')}
      description={t('labs.threads.desc')}
      guide={<Guide />}
      demo={<Demo />}
    />
  );
};
