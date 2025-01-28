import { motion } from 'framer-motion';
import styles from '../styles.module.css';

type Props = {
  projectIndex: number;
  projectsLength: number;
  setProjectIndex: React.Dispatch<React.SetStateAction<[number, number]>>;
  wrappedIndex: number;
  paginate: (direction: number) => void;
};

const CarouselSelector = ({
  projectIndex,
  setProjectIndex,
  projectsLength,
  wrappedIndex,
  paginate,
}: Props) => {
  return (
    <div className={styles.carouselSelector}>
      <motion.button whileTap={{ scale: 0.8 }} type="button" onClick={() => paginate(-1)} className={styles.chevron}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"

        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </motion.button>

      <div className={styles.dots}>

        {Array.from({ length: projectsLength }, (_, i) => {
          return (
            <motion.button
              initial={{ scale: 1, backgroundColor: 'var(--neutral-400)' }}
              animate={{ scale: wrappedIndex === i ? 1.2 : 1, backgroundColor: wrappedIndex === i ? 'var(--primary-900)' : 'var(--neutral-400)' }}
              transition={{ duration: 0.05 }}
              type="button"
              className={styles.dot}
              onClick={() => setProjectIndex([i, i === projectIndex ? 0 : i > projectIndex ? 1 : -1])}
              key={i}
            />
          );
        })}
      </div>

      <motion.button whileTap={{ scale: 0.8 }} type="button" onClick={() => paginate(1)} className={styles.chevron}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </motion.button>
    </div>
  );
};

export default CarouselSelector;
