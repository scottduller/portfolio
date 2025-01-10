import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styles from './styles.module.css';

const Home = () => {
  return (
    <div className="wrapper">
      <hr className={styles.hr} />
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src="/me.png"
          alt="Scott Duller"
          width={1152}
          height={1536}
        />
      </div>
      <h1 className={styles.title}>SCOTT DULLER</h1>
      <Link href="#contact" className={styles.link}>
        <span>Let's Connect</span>
        <span>03</span>
      </Link>
    </div>
  );
};

export default Home;
