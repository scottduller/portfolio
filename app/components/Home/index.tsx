import Image from 'next/image';
import React from 'react';
import ScrollButton from '../ScrollButton';
import styles from './styles.module.css';

// TODO: Redesign home page so that the image background gradient contains all the content of the section

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
      <ScrollButton
        className={styles.link}
        section={3}
        whileTap={{ scale: 0.9 }}
        whileHover={{
          backgroundColor: 'var(--tertiary-500)',
          color: 'var(--neutral-100)',
        }}
      >
        <span>Let's Connect</span>
        <span>03</span>
      </ScrollButton>
    </div>
  );
};

export default Home;
