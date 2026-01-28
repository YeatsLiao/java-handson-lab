import React from 'react';
import { useTranslation } from 'react-i18next';
import { LabLayout } from '../../../components/LabLayout/LabLayout';
import { Guide } from './Guide.tsx';
import { Demo } from './Demo.tsx';

export const References: React.FC = () => {
  const { t } = useTranslation();
  return (
    <LabLayout
      title={t('labs.references.title')}
      description={t('labs.references.desc')}
      guide={<Guide />}
      demo={<Demo />}
    />
  );
};
