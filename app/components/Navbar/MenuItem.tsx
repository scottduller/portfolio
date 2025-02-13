import { SectionSettingsContext } from '@/context';
import * as motion from 'motion/react-client';
import { useContext } from 'react';
import styles from './styles.module.css';

const MenuItem = ({ section, setIsOpen, title }: { section: number; setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; title: string }) => {
  const { sectionSettings } = useContext(SectionSettingsContext);

  const handleMenuItemClick = (section: number) => {
    const sectionRef = sectionSettings[section].ref;
    sectionRef?.current?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
    window.history.back();
  };

  const menuItemVariants = {
    closed: (index: number) => ({
      opacity: 0,
      x: 100,
      flexGrow: sectionSettings[index].active ? 1 : 0.2,
      transition: {
        duration: 0.25,
      },
    }),
    open: (index: number) => ({
      opacity: 1,
      x: 0,
      flexGrow: sectionSettings[index].active ? 1 : 0.2,
      transition: {
        duration: 0.25,
      },
    }),
  };

  return (
    <motion.button
      type="button"
      onClick={() => handleMenuItemClick(section)}
      className={styles.item}
      variants={menuItemVariants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      custom={section}
    >
      <motion.div className={styles.title}>{title}</motion.div>
      <motion.div className={styles.number}>{section.toString().padStart(2, '0')}</motion.div>
    </motion.button>
  );
};

export default MenuItem;
