import Logo from '@assets/logo.svg';
import Link from 'next/link';
import Hamburger from './Hamburger';
import styles from './styles.module.css';

const Navbar = () => {
  return (
    <div className={styles.navbarWrapper}>
      <nav className={styles.navbar}>
        <Link
          className={`${styles.navLink} ${styles.active} ${styles.home}`}
          href="/"
        >
          <div className={styles.name}>
            <Logo className={styles.logo} />
            <div>Scott Duller</div>
          </div>
          <div className={styles.number}>00</div>
        </Link>
        <Hamburger />
      </nav>
    </div>
  );
};

export default Navbar;
