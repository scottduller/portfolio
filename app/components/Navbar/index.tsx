import Logo from '@assets/logo.svg';
import Hamburger from './Hamburger';
import styles from './styles.module.css';

const Navbar = () => {
  return (
    <div className={styles.navbarWrapper}>
      <nav className={styles.navbar}>
        <div className={`${styles.navLink} ${styles.active} ${styles.home}`}>
          <div className={styles.name}>
            <Logo className={styles.logo} />
            <div>Scott Duller</div>
          </div>
          <div className={styles.number}>00</div>
        </div>
        <Hamburger />
      </nav>
    </div>
  );
};

export default Navbar;
