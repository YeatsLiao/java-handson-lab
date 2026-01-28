import React from 'react';
import { useTranslation } from 'react-i18next';
import { LabLayout } from '../../../components/LabLayout/LabLayout';
import { Guide } from './Guide.tsx';
import { Demo } from './Demo.tsx';

export const Stack: React.FC = () => {
  const { t } = useTranslation();
  return (
    <LabLayout
      title={t('labs.stack.title')}
      description={t('labs.stack.desc')}
      guide={<Guide />}
      demo={<Demo />}
    />
  );
};
