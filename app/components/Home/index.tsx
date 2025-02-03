import { HERO_DELAY, HERO_DURATION, HERO_IMAGE_DELAY, HERO_IMAGE_DURATION, HERO_TEXT_DELAY, HERO_TEXT_DURATION, HERO_TEXT_STAGGER } from '@/constants/animation';

import * as motion from 'motion/react-client';
import Image from 'next/image';
import TextResizer from '../TextResizer';
import styles from './styles.module.css';

const heroVariants = {
  initial: {
    opacity: 0,
    y: '50%',
  },
  animate: {
    y: 0,
    opacity: 1,

    transition: {
      delay: HERO_DELAY,
      duration: HERO_DURATION,
    },

  },
};

const heroImageVariants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: HERO_IMAGE_DELAY,
      duration: HERO_IMAGE_DURATION,
    },
  },
};

const heroContentVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0,
      delayChildren: HERO_TEXT_DELAY,
      staggerChildren: HERO_TEXT_STAGGER,
    },
  },
};

const heroTextVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: HERO_TEXT_DURATION,
    },
  },
};

const Home = () => {
  return (
    <div className={styles.wrapper}>

      <motion.div variants={heroContentVariants} initial="initial" animate="animate" className={styles.content}>
        <motion.div variants={heroTextVariants} className={styles.title}>
          <TextResizer as="h1" mode="oneline">
            SCOTT
            <br />
            DULLER
          </TextResizer>
        </motion.div>
        <motion.p variants={heroTextVariants} className={styles.description}>
          Crafting seamless web experiences with dynamic designs and robust
          solutions, I build user-focused applications that bring ideas to life.
        </motion.p>
      </motion.div>
      <motion.div variants={heroVariants} initial="initial" animate="animate" className={styles.hero}>

        <motion.div variants={heroImageVariants} className={styles.image}>
          <Image
            className={styles.image}
            src="/me.png"
            alt="Scott Duller"
            width={1152}
            height={1536}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
