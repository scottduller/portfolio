'use client';

import type { MotionProps } from 'motion/react';
import { InViewContext } from '@/context';
import * as motion from 'motion/react-client';
import React, { useContext } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  section: 0 | 1 | 2 | 3;
} & MotionProps;

const ScrollButton = ({ children, className, section }: Props) => {
  const { inView } = useContext(InViewContext);
  const { ref } = inView[section];
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.0125 }}
      whileTap={{ scale: 0.9875 }}
      className={className}
      onClick={() => ref?.current?.scrollIntoView({ behavior: 'smooth' })}
    >
      {children}
    </motion.button>
  );
};

export default ScrollButton;
