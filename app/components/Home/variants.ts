import {
  HERO_DELAY,
  HERO_DURATION,
  HERO_IMAGE_DELAY,
  HERO_IMAGE_DURATION,
  HERO_TEXT_DELAY,
  HERO_TEXT_DURATION,
  HERO_TEXT_STAGGER,
} from '@/constants/constants';

const wrapperVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0,
      delayChildren: HERO_TEXT_DELAY,
      staggerChildren: HERO_TEXT_STAGGER,
    },
  },
};

const textVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: HERO_TEXT_DURATION,
    },
  },
};

const heroVariants = {
  initial: {
    opacity: 0,
    y: '50%',
  },
  animate: {
    y: 0,
    opacity: 1,

    transition: {
      delay: HERO_DELAY,
      duration: HERO_DURATION,
    },
  },
};

const heroImageVariants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: HERO_IMAGE_DELAY,
      duration: HERO_IMAGE_DURATION,
    },
  },
};

const scrollDownIconVariants = {
  initial: {
    y: '0',
  },
  animate: {
    y: ['10%', '-10%'],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: 'mirror',
      type: 'spring',
    },
  },
  hover: {
    y: ['-100%', '100%'],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'linear',
    },
  },
};

export {
  heroImageVariants,
  heroVariants,
  scrollDownIconVariants,
  textVariants,
  wrapperVariants,
};
