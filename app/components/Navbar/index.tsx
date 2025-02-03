import { NAVBAR_DELAY, NAVBAR_DURATION } from '@/constants/animation';
import Logo from '@assets/logo.svg';
import * as motion from 'motion/react-client';
import Hamburger from './Hamburger';
import NavItem from './NavItem';
import styles from './styles.module.css';

const variants = {
  initial: {
    opacity: 0,
    x: '-50%',
    y: 'calc(-1 * var(--navbar-height))',
    zIndex: 0,

  },
  animate: {
    opacity: 1,
    x: '-50%',
    y: 0,
    zIndex: 20,
    transition: {
      type: 'spring',
      bounce: 0,
      duration: `${NAVBAR_DURATION}`,
      delay: NAVBAR_DELAY,
    },
  },
};

const Navbar = () => {
  return (
    <motion.nav variants={variants} initial="initial" animate="animate" className={styles.navbar} viewport={{ once: true }}>
      <NavItem section={0}>
        <Logo className={styles.logo} />
        <div>Scott Duller</div>
      </NavItem>
      <Hamburger />
    </motion.nav>
  );
};

export default Navbar;
