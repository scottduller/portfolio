'use client';

import { InViewContext } from '@/context';
import { motion, type MotionProps } from 'framer-motion';
import React, { useContext } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  section: 0 | 1 | 2 | 3;
} & MotionProps;

const ScrollButton = ({ children, className, section, ...rest }: Props) => {
  const { inView } = useContext(InViewContext);
  const { ref } = inView[section];

  return (
    <motion.button
      type="button"
      className={className}
      onClick={() => ref?.current?.scrollIntoView({ behavior: 'smooth' })}
      {...rest}
    >
      {children}
    </motion.button>
  );
};

export default ScrollButton;
