'use client';

import type { MotionProps } from 'motion/react';
import { SectionSettingsContext } from '@/context';
import * as motion from 'motion/react-client';
import React, { useContext } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  section: 0 | 1 | 2 | 3;
} & MotionProps;

const ScrollButton = ({ children, className, section }: Props) => {
  const { sectionSettings } = useContext(SectionSettingsContext);
  const { ref } = sectionSettings[section];
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
      onClick={() => ref?.current?.scrollIntoView({ behavior: 'smooth' })}
    >
      {children}
    </motion.button>
  );
};

export default ScrollButton;
