'use client';

import type { Project } from '..';
import { useState } from 'react';
import styles from '../styles.module.css';
import CarouselItem from './CarouselItem';
import CarouselSelector from './CarouselSelector';

type Props = {
  projects: Project[];
};

const Carousel = ({ projects }: Props) => {
  const [projectIndex, setProjectIndex] = useState(0);

  return (
    <div className={styles.carousel}>
      <CarouselItem
        project={projects[projectIndex]}
        projectIndex={projectIndex}
      />
      <CarouselSelector
        projectIndex={projectIndex}
        setProjectIndex={setProjectIndex}
        projectsLength={projects.length}
      />
    </div>
  );
};

export default Carousel;
