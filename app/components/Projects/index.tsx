import * as motion from 'motion/react-client';
import React from 'react';
import Carousel from './Carousel';
import { projects } from './projects';

import styles from './styles.module.css';

export type Project = {
  name: string;
  description: string;
  image?: string;
  github?: string;
  website?: string;
};

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

const Projects = () => {
  return (
    <div className={styles.wrapper}>
      <motion.div variants={headerVariants} initial="hidden" whileInView="visible" className={styles.header} viewport={{ once: true }}>
        <motion.h2 variants={headerTextVariants}>Projects</motion.h2>
        <motion.h2 variants={headerTextVariants}>01</motion.h2>
      </motion.div>
      <Carousel projects={projects} />
    </div>
  );
};

export default Projects;
