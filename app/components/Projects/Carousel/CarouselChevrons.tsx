import { motion } from 'framer-motion';
import styles from '../styles.module.css';

type Props = {
  projectIndex: number;
  setProjectIndex: React.Dispatch<React.SetStateAction<number>>;
  projectsLength: number;
};

const CarouselChevrons = ({
  projectIndex,
  setProjectIndex,
  projectsLength,
}: Props) => {
  const handleDecrement = () => {
    if (projectIndex <= 0) {
      setProjectIndex(projectsLength - 1);
    } else {
      setProjectIndex((prevState) => prevState - 1);
    }
  };

  const handleIncrement = () => {
    if (projectIndex >= projectsLength - 1) {
      setProjectIndex(0);
    } else {
      setProjectIndex((prevState) => prevState + 1);
    }
  };

  return (
    <>
      <motion.button whileTap={{ scale: 0.8 }} initial={{ y: '-50%' }} type="button" onClick={handleDecrement} className={`${styles.chevron} ${styles.left}`}>
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

      <motion.button whileTap={{ scale: 0.8 }} initial={{ y: '-50%' }} type="button" onClick={handleIncrement} className={`${styles.chevron} ${styles.right}`}>
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
    </>
  );
};

export default CarouselChevrons;
