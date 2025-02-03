import * as motion from 'motion/react-client';
import React from 'react';
import styles from './styles.module.css';

const headerVariants = {
  visible: {
    opacity: 1,
    width: '100%',
    transition: {
      duration: 0.5,
      delayChildren: 0.6,
    }
  },
  hidden: {
    width: '0%',
    opacity: 0,
  },
};

const headerTextVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    }
  },
  hidden: {
    opacity: 0,
    y: 20,
  },
};

const contentsVariants = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delayChildren: 1,
      staggerChildren: 0.25,
    }
  },
  hidden: {
    opacity: 0,
  },
};

const contentVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    }
  },
  hidden: {
    opacity: 0,
    y: 20,
  },
};

const hrVariants = {
  visible: {
    opacity: 1,
    width: '100%',
    transition: {
      duration: 0.25,
    }
  },
  hidden: {
    opacity: 0,
    width: '0%',
  },
};

const About = () => {
  return (
    <div className={styles.wrapper}>
      <motion.div variants={headerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className={styles.header}>
        <motion.h2 variants={headerTextVariants} viewport={{ once: true }}>About</motion.h2>
        <motion.h2 variants={headerTextVariants} viewport={{ once: true }}>02</motion.h2>
      </motion.div>
      <motion.div variants={contentsVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className={styles.content}>
        <motion.strong variants={contentVariants} viewport={{ once: true }}>
          Specialising in reusable and scalable digital systems with a focus on responsive, interactive, and visually elegant content.
        </motion.strong>
        <motion.hr variants={hrVariants} viewport={{ once: true }} />
        <motion.p variants={contentVariants} viewport={{ once: true }}>
          I’m Scott Duller, a full-stack developer from Brighton, UK, with a knack for solving complex problems through clean, reusable code.
        </motion.p>
        <motion.p variants={contentVariants} viewport={{ once: true }}>
          Working with JavaScript technologies like React and Next.js, I bring ideas to life with precision and creativity.
        </motion.p>
        <motion.p variants={contentVariants} viewport={{ once: true }}>
          Inspired by the harmony of beautiful geometry, I aim to create solutions that are not only functional but also visually stunning.
        </motion.p>

      </motion.div>
    </div>
  );
};

export default About;
