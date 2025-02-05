import { STAGGER_CHILDREN } from '@/constants/animation';

const wrapperVariants = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER_CHILDREN,
      duration: 1,
    },
  },
  hidden: {
    opacity: 0,
  },
};

const contentVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  hidden: {
    opacity: 0,
    y: 30,
  },
};

export { contentVariants, wrapperVariants };
