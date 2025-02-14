'use client';

import type { Variants } from 'motion/react';
import ScrollButton from '@/components/shared/ScrollButton';
import * as motion from 'motion/react-client';
import { useState } from 'react';
import { ScrollDownIcon } from '../shared/Icons';
import styles from './styles.module.css';
import { scrollDownIconVariants } from './variants';

const MotionScrollDownIcon = motion.create(ScrollDownIcon);

const ScrollDownButton = () => {
  const [isHovered, setIsHovered] = useState<'animate' | 'hover'>('animate');

  return (
    <ScrollButton className={styles.scrollDownButton} whileHover={{ scale: 1.1, y: '0' }} onHoverStart={() => setIsHovered('hover')} onHoverEnd={() => setIsHovered('animate')} whileTap={{ scale: 0.9 }} section={1}>
      <div className={styles.iconWrapper}>
        <MotionScrollDownIcon
          variants={scrollDownIconVariants as Variants}
          initial="initial"
          animate={isHovered}
          className={styles.icon}
        />
      </div>
    </ScrollButton>
  );
};

export default ScrollDownButton;
