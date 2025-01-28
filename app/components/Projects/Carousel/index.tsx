'use client';

import type { Project } from '..';
import { wrap } from 'framer-motion';
import { useState } from 'react';
import styles from '../styles.module.css';
import CarouselCard from './CarouselCard';
import CarouselDescription from './CarouselDescription';
import CarouselSelector from './CarouselSelector';

type Props = {
  projects: Project[];
};

const Carousel = ({ projects }: Props) => {
  const [[projectIndex, direction], setProjectIndex] = useState([0, 0]);

  const wrappedIndex = wrap(0, projects.length, projectIndex);

  const paginate = (
    direction: number,
  ) => {
    setProjectIndex((prevState) => [prevState[0] + direction, direction]);
  };

  return (
    <div className={styles.carousel}>
      <CarouselCard
        project={projects[wrappedIndex]}
        projectIndex={projectIndex}
        wrappedIndex={wrappedIndex}
        direction={direction}
        paginate={paginate}
      />
      <CarouselSelector
        projectIndex={projectIndex}
        setProjectIndex={setProjectIndex}
        wrappedIndex={wrappedIndex}
        projectsLength={projects.length}
        paginate={paginate}
      />
      <CarouselDescription
        description={projects[wrappedIndex].description}
      />
    </div>
  );
};

export default Carousel;
