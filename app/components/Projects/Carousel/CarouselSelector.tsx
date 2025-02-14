import type { CarouselItemProps } from '.';
import { ChevroLeftIcon, ChevroRightIcon } from '@/components/shared/Icons';
import { motion, wrap } from 'framer-motion';
import styles from '../styles.module.css';

const CarouselSelector = ({
  projects,
  projectIndex,
  paginate,
  setProjectIndex,
}: CarouselItemProps & { setProjectIndex: React.Dispatch<React.SetStateAction<[number, number]>> }) => {
  const wrappedProjectIndex = wrap(0, projects.length, projectIndex);

  return (
    <motion.div className={styles.carouselSelector}>
      <motion.button whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} type="button" onClick={() => paginate(-1)} className={styles.chevron}>
        <ChevroLeftIcon />
      </motion.button>

      <div className={styles.dots}>

        {Array.from({ length: projects.length }, (_, i) => {
          return (
            <motion.button
              initial={{ scale: 1, backgroundColor: 'var(--neutral-400)' }}
              animate={{ scale: wrappedProjectIndex === i ? 1.2 : 1, backgroundColor: wrappedProjectIndex === i ? 'var(--primary-900)' : 'var(--neutral-400)' }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              type="button"
              className={styles.dot}
              onClick={() => setProjectIndex([i, i === projectIndex ? 0 : i > projectIndex ? 1 : -1])}
              key={i}
            />
          );
        })}
      </div>

      <motion.button whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} type="button" onClick={() => paginate(1)} className={styles.chevron}>
        <ChevroRightIcon />
      </motion.button>
    </motion.div>
  );
};

export default CarouselSelector;
