'use client';

import { NAVITEM_WIDTH_THRESHOLD_MIN } from '@/constants/constants';
import React, { createContext, useState } from 'react';

export type SectionSettingsList = Array<SectionSettings>;

export type SectionSettings = {
  active: boolean;
  percentVisable: number;
  ref?: React.RefObject<HTMLDivElement | null>;
};

type SectionSettingsContextType = {
  sectionSettings: SectionSettingsList;
  setSectionSettings: React.Dispatch<React.SetStateAction<SectionSettingsList>>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const SectionSettingsContext = createContext<SectionSettingsContextType>(
  {} as SectionSettingsContextType
);

export const SectionSettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [sectionSettings, setSectionSettings] = useState<SectionSettingsList>([
    {
      active: false,
      percentVisable: NAVITEM_WIDTH_THRESHOLD_MIN,
    },
    {
      active: false,
      percentVisable: NAVITEM_WIDTH_THRESHOLD_MIN,
    },
    {
      active: false,
      percentVisable: NAVITEM_WIDTH_THRESHOLD_MIN,
    },
    {
      active: false,
      percentVisable: NAVITEM_WIDTH_THRESHOLD_MIN,
    },
  ]);

  return (
    <SectionSettingsContext value={{ sectionSettings, setSectionSettings }}>{children}</SectionSettingsContext>
  );
};
