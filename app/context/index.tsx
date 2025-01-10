'use client';

import React, { createContext, useState } from 'react';

type InViewType = {
  home: boolean;
  projects: boolean;
  about: boolean;
  contact: boolean;
};

type InViewContextType = {
  inView: InViewType;
  setInView: React.Dispatch<React.SetStateAction<InViewType>>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const InViewContext = createContext<InViewContextType>(
  {} as InViewContextType
);

export const InViewProvider = ({ children }: { children: React.ReactNode }) => {
  const [inView, setInView] = useState({
    home: false,
    projects: false,
    about: false,
    contact: false,
  });

  return (
    <InViewContext value={{ inView, setInView }}>{children}</InViewContext>
  );
};
