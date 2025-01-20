import Logo from '@assets/logo.svg';
import Hamburger from './Hamburger';
import NavItem from './NavItem';
import styles from './styles.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <NavItem section={0}>
        <Logo className={styles.logo} />
        <div>Scott Duller</div>
      </NavItem>
      <Hamburger />
    </nav>
  );
};

export default Navbar;
