'use client';

import type { Project } from '..';
import * as motion from 'motion/react-client';
import { useState } from 'react';
import { contentVariants } from '../../globalVariants';
import styles from '../styles.module.css';
import CarouselCard from './CarouselCard';
import CarouselContent from './CarouselContent';
import CarouselSelector from './CarouselSelector';

type CarouselProps = {
  projects: Project[];
};

export type CarouselItemProps = {
  projectIndex: number;
  direction: number;
  paginate: (direction: number) => void;
} & CarouselProps;

const Carousel = ({ projects }: CarouselProps) => {
  const [[projectIndex, direction], setProjectIndex] = useState([0, 0]);

  const paginate = (
    direction: number,
  ) => {
    setProjectIndex((prevState) => [prevState[0] + direction, direction]);
  };

  return (
    <>
      <motion.div variants={contentVariants} className={styles.carouselSectionWrapper}>
        <CarouselCard
          projects={projects}
          projectIndex={projectIndex}
          direction={direction}
          paginate={paginate}
        />
      </motion.div>
      <motion.div variants={contentVariants} className={styles.carouselSectionWrapper}>
        <CarouselSelector
          projects={projects}
          projectIndex={projectIndex}
          direction={direction}
          paginate={paginate}
          setProjectIndex={setProjectIndex}
        />
      </motion.div>
      <motion.div variants={contentVariants} className={styles.carouselSectionWrapper}>
        <hr />
        <CarouselContent
          projects={projects}
          projectIndex={projectIndex}
          direction={direction}
          paginate={paginate}
        />
      </motion.div>
    </>
  );
};

export default Carousel;
