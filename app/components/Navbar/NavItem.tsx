'use client';

import { SectionSettingsContext } from '@/context';
import * as motion from 'motion/react-client';
import { useContext } from 'react';
import styles from './styles.module.css';

type Props = {
  children: React.ReactNode;
  section: 0 | 1 | 2 | 3;
};

const NavItem = ({ children, section }: Props) => {
  const { sectionSettings } = useContext(SectionSettingsContext);
  const { ref, active } = sectionSettings[section];

  return (
    <motion.button className={`${styles.navItem} ${active ? styles.active : ''}`} whileTap={{ scale: 0.95 }} onClick={() => ref?.current?.scrollIntoView()}>
      {children}

    </motion.button>
  );
};

export default NavItem;
