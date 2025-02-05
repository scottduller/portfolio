import { InViewContext } from '@/context';
import * as motion from 'motion/react-client';
import { useContext } from 'react';
import styles from './styles.module.css';

const MenuItem = ({ section, setIsOpen, title }: { section: number; setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; title: string }) => {
  const { inView } = useContext(InViewContext);

  const handleMenuItemClick = (section: number) => {
    const sectionRef = inView[section].ref;
    sectionRef?.current?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
    window.history.back();
  };

  const menuItemVariants = {
    closed: (index: number) => ({
      opacity: 0,
      x: 100,
      flexGrow: inView[index].scrollProgress,
      transition: {
        duration: 0,
      },
    }),
    open: (index: number) => ({
      opacity: 1,
      x: 0,
      flexGrow: inView[index].scrollProgress,
      transition: {
        duration: 0.5,
      },
    }),
  };

  return (
    <motion.button
      type="button"
      onClick={() => handleMenuItemClick(section)}
      className={styles.item}
      variants={menuItemVariants}
      whileHover={{ scale: 1.025 }}
      whileTap={{ scale: 0.975 }}
      custom={section}
    >
      <motion.div className={styles.title}>{title}</motion.div>
      <motion.div className={styles.number}>{section.toString().padStart(2, '0')}</motion.div>
    </motion.button>
  );
};

export default MenuItem;
