import styles from './styles.module.css';

type Props = {
  children: React.ReactNode;
};

const Container = (props: Props) => {
  return <div className={styles.container}>{props.children}</div>;
};

export default Container;
