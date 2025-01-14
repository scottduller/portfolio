'use client';

import React, { createContext, useState } from 'react';

type InViewType = [
  {
    isInView: boolean;
    scrollProgress: number;
  },
  {
    isInView: boolean;
    scrollProgress: number;
  },
  {
    isInView: boolean;
    scrollProgress: number;
  },
  {
    isInView: boolean;
    scrollProgress: number;
  },
];

type InViewContextType = {
  inView: InViewType;
  setInView: React.Dispatch<React.SetStateAction<InViewType>>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const InViewContext = createContext<InViewContextType>(
  {} as InViewContextType
);

export const InViewProvider = ({ children }: { children: React.ReactNode }) => {
  const [inView, setInView] = useState<InViewType>([
    {
      isInView: false,
      scrollProgress: 0,
    },
    {
      isInView: false,
      scrollProgress: 0,
    },
    {
      isInView: false,
      scrollProgress: 0,
    },
    {
      isInView: false,
      scrollProgress: 0,
    },
  ]);

  return (
    <InViewContext value={{ inView, setInView }}>{children}</InViewContext>
  );
};
