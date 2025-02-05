import * as motion from 'motion/react-client';
import React from 'react';
import { contentVariants, wrapperVariants } from '../globalVariants';
import styles from './styles.module.css';

const About = () => {
  return (
    <motion.div className={styles.wrapper} variants={wrapperVariants} initial="hidden" whileInView="visible" viewport={{ margin: '-25% 0px -25% 0px', once: true }}>
      <motion.div variants={contentVariants} className="header">
        <h2>02.</h2>
        <h2>ABOUT</h2>
      </motion.div>

      <motion.strong variants={contentVariants}>
        Specialising in reusable and scalable digital systems with a focus on responsive, interactive, and visually elegant content.
      </motion.strong>

      <motion.hr variants={contentVariants} />

      <motion.p variants={contentVariants}>
        I’m Scott Duller, a full-stack developer from Brighton, UK, with a knack for solving complex problems through clean, reusable code.
      </motion.p>

      <motion.p variants={contentVariants}>
        Working with JavaScript technologies like React and Next.js, I bring ideas to life with precision and creativity.
      </motion.p>

      <motion.p variants={contentVariants}>
        Inspired by the harmony of beautiful geometry, I aim to create solutions that are not only functional but also visually stunning.
      </motion.p>

    </motion.div>
  );
};

export default About;
