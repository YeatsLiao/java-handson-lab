import React from 'react';
import { useTranslation } from 'react-i18next';
import { LabLayout } from '../../../components/LabLayout/LabLayout';
import { Guide } from './Guide';
import { Demo } from './Demo';

export const ExceptionsLab: React.FC = () => {
  const { t } = useTranslation();
  return (
    <LabLayout
      title={t('labs.exceptions.title')}
      description={t('labs.exceptions.desc')}
      guide={<Guide />}
      demo={<Demo />}
    />
  );
};
