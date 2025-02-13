'use client';

import { SectionSettingsContext } from '@/context';
import * as motion from 'motion/react-client';
import React, { useContext } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  section: 0 | 1 | 2 | 3;
  ref?: React.RefObject<HTMLButtonElement>;
};

const ScrollButtonContainer = ({ children, className, section, ref }: Props) => {
  const { sectionSettings } = useContext(SectionSettingsContext);
  const { ref: sectionRef } = sectionSettings[section];
  return (
    <button
      type="button"
      className={className}
      onClick={() => sectionRef?.current?.scrollIntoView({ behavior: 'smooth' })}
      ref={ref}
    >
      {children}
    </button>
  );
};

const ScrollButton = motion.create(ScrollButtonContainer);

export default ScrollButton;
