import React from 'react';
import { useTranslation } from 'react-i18next';
import { LabLayout } from '../../../components/LabLayout/LabLayout';
import { Guide } from './Guide';
import { Demo } from './Demo';

export const StaticMembers: React.FC = () => {
  const { t } = useTranslation();
  return (
    <LabLayout
      title={t('labs.staticMembers.title')}
      description={t('labs.staticMembers.desc')}
      guide={<Guide />}
      demo={<Demo />}
    />
  );
};
