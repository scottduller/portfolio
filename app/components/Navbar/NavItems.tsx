'use client';

import { SectionSettingsContext } from '@/context';
import * as motion from 'motion/react-client';
import { useContext } from 'react';
import styles from './styles.module.css';

const NavItems = ({ children }: { children: React.ReactNode }) => {
  const { sectionSettings } = useContext(SectionSettingsContext);

  const variants = {
    animate: {
      gridTemplateColumns: `${sectionSettings[0].percentVisable}fr ${sectionSettings[1].percentVisable}fr ${sectionSettings[2].percentVisable}fr ${sectionSettings[3].percentVisable}fr`,
      transition: {
        duration: 0.25,
      },
    },
  };

  return (
    <motion.div variants={variants} animate="animate" className={styles.navItems}>
      {children}
    </motion.div>
  );
};

export default NavItems;
