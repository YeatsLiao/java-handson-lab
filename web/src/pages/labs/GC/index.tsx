import React from 'react';
import { useTranslation } from 'react-i18next';
import { LabLayout } from '../../../components/LabLayout/LabLayout';
import { Guide } from './Guide';
import { Demo } from './Demo';

export const GCLab: React.FC = () => {
  const { t } = useTranslation();
  return (
    <LabLayout
      title={t('labs.gc.title')}
      description={t('labs.gc.desc')}
      guide={<Guide />}
      demo={<Demo />}
    />
  );
};
