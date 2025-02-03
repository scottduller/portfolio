'use client';

import type { Project } from '..';
import * as motion from 'motion/react-client';
import { useState } from 'react';
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

  const carouselVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1,
        duration: 1,
      },
    },
    hidden: {
      opacity: 0,
      y: 30,
    },
  };

  return (
    <motion.div variants={carouselVariants} initial="hidden" whileInView="visible" className={styles.carousel} viewport={{ once: true }}>
      <CarouselCard
        projects={projects}
        projectIndex={projectIndex}
        direction={direction}
        paginate={paginate}
      />
      <CarouselSelector
        projects={projects}
        projectIndex={projectIndex}
        direction={direction}
        paginate={paginate}
        setProjectIndex={setProjectIndex}
      />
      <CarouselContent
        projects={projects}
        projectIndex={projectIndex}
        direction={direction}
        paginate={paginate}
      />
    </motion.div>
  );
};

export default Carousel;
