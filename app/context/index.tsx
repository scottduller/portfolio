'use client';

import React, { createContext, useState } from 'react';

export type InViewType = [
  {
    isInView: boolean;
    scrollProgress: number;
    ref?: React.RefObject<HTMLDivElement | null>;
  },
  {
    isInView: boolean;
    scrollProgress: number;
    ref?: React.RefObject<HTMLDivElement | null>;
  },
  {
    isInView: boolean;
    scrollProgress: number;
    ref?: React.RefObject<HTMLDivElement | null>;
  },
  {
    isInView: boolean;
    scrollProgress: number;
    ref?: React.RefObject<HTMLDivElement | null>;
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
