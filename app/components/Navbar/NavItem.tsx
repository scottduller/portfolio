import ScrollButton from '../ScrollButton';
import styles from './styles.module.css';

type Props = {
  children: React.ReactNode;
  section: 0 | 1 | 2 | 3;
};

const NavItem = ({ children, section }: Props) => {
  return (
    <ScrollButton className={styles.navItem} section={section}>
      <div className={styles.content}>{children}</div>
    </ScrollButton>
  );
};

export default NavItem;
