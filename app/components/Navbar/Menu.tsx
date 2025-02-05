import * as motion from 'motion/react-client';
import MenuItem from './MenuItem';
import styles from './styles.module.css';

const Menu = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const menuVariants = {
    closed: {
      clipPath: 'circle(0% at 100% 0%)',
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    open: {
      clipPath: 'circle(100% at 50% 50%)',
      opacity: 1,
      transition: {
        duration: 0.5,
        delayChildren: 0.4,
        staggerChildren: 0.2,
        staggerDirection: -1,
      },
    },
  };

  return (
    <motion.div
      className={styles.menu}
      variants={menuVariants}
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
    >
      <MenuItem section={0} setIsOpen={setIsOpen} title="Home" />
      <MenuItem section={1} setIsOpen={setIsOpen} title="Projects" />
      <MenuItem section={2} setIsOpen={setIsOpen} title="About" />
      <MenuItem section={3} setIsOpen={setIsOpen} title="Contact" />
    </motion.div>
  );
};

export default Menu;
