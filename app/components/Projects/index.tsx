import * as motion from 'motion/react-client';
import React from 'react';
import { contentVariants, wrapperVariants } from '../globalVariants';

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

const Projects = () => {
  return (
    <motion.div className={styles.wrapper} variants={wrapperVariants} initial="hidden" whileInView="visible" viewport={{ margin: '-25% 0px -25% 0px', once: true }}>
      <motion.div variants={contentVariants} className="header">
        <h2>01.</h2>
        <h2>PROJECTS</h2>
      </motion.div>
      <Carousel projects={projects} />
    </motion.div>
  );
};

export default Projects;
