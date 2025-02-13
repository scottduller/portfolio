import * as motion from 'motion/react-client';
import MenuItem from './MenuItem';
import styles from './styles.module.css';
import { menuVariants } from './variants';

const Menu = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
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
