import { NAVBAR_DELAY, NAVBAR_DURATION } from '@/constants/constants';
import Logo from '@assets/logo.svg';
import * as motion from 'motion/react-client';
import Hamburger from './Hamburger';
import NavItem from './NavItem';
import NavItems from './NavItems';
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
      <div className={styles.logoContainer}>
        <Logo className={styles.logo} />
      </div>
      <NavItems>
        <NavItem section={0}>
          <div className={styles.sectionTitle}>
            Scott Duller
            {' '}
            <span className={styles.sectionTitleExtended}>
              - Full Stack Web Developer
            </span>
          </div>
        </NavItem>
        <NavItem section={0}>
          <div className={styles.sectionTitle}>
            Home

          </div>
          <span className={styles.number}>00</span>
        </NavItem>
        <NavItem section={1}>
          <div className={styles.sectionTitle}>
            Projects
          </div>
          <span className={styles.number}>01</span>
        </NavItem>
        <NavItem section={2}>
          <div className={styles.sectionTitle}>
            About
          </div>
          <span className={styles.number}>02</span>
        </NavItem>
        <NavItem section={3}>
          <div className={styles.sectionTitle}>
            Contact
          </div>
          <span className={styles.number}>03</span>
        </NavItem>
      </NavItems>
      <Hamburger />
    </motion.nav>
  );
};

export default Navbar;
