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

const Projects = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Projects</h2>
        <h2>01</h2>
      </div>
      <Carousel projects={projects} />
    </div>
  );
};

export default Projects;
