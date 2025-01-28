import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from '../styles.module.css';

type Props = {
  description: string;
};

const CarouselDescription = ({ description }: Props) => {
  const [key, setKey] = useState(uuidv4());

  useEffect(() => {
    setKey(uuidv4());
  }, [description]);

  const descriptionVariants: Variants = {
    initial: { opacity: 0, y: 25 },
    animate: { opacity: 1, y: 0, zIndex: 1, transition: { y: { duration: 0.4 }, opacity: { duration: 0.4 } } },
    exit: { opacity: 0, zIndex: 0, transition: { duration: 0.4 } },
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={key}
        className={styles.content}
        variants={descriptionVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {description}
      </motion.div>
    </AnimatePresence>
  );
};

export default CarouselDescription;
