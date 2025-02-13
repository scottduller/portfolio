import type { CarouselItemProps } from '.';
import { AnimatePresence, motion, type Variants, wrap } from 'framer-motion';
import styles from '../styles.module.css';

const CarouselContent = ({ projects, projectIndex }: CarouselItemProps) => {
  const wrappedProjectIndex = wrap(0, projects.length, projectIndex);
  const { description, name } = projects[wrappedProjectIndex];

  const descriptionVariants: Variants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, zIndex: 1, transition: { y: { duration: 0.4 }, opacity: { duration: 0.5 } } },
    exit: { opacity: 0, zIndex: 0, transition: { duration: 0.4 } },
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.p
        key={`${name}-description`}
        className={styles.description}
        variants={descriptionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {description}
      </motion.p>
    </AnimatePresence>
  );
};

export default CarouselContent;
