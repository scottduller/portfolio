import Image from 'next/image';

import TextResizer from '../TextResizer';
import styles from './styles.module.css';

const Home = () => {
  return (
    <div className={styles.wrapper}>

      <div className={styles.content}>
        <div>
          <TextResizer as="h1" mode="oneline">
            SCOTT
            <br />
            DULLER
          </TextResizer>
        </div>
        <p>
          Crafting seamless web experiences with dynamic designs and robust
          solutions, I build user-focused applications that bring ideas to life.
        </p>
      </div>
      <div className={styles.hero}>
        <Image
          className={styles.image}
          src="/me.png"
          alt="Scott Duller"
          width={1152}
          height={1536}
        />
      </div>
    </div>
  );
};

export default Home;
