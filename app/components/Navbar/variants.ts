// Hamburger variants

import { NAVBAR_DELAY, NAVBAR_DURATION } from '@/constants/constants';

const hamburgerVariants = {
  closed: {
    backgroundColor: 'var(--tertiary-500)',
    transition: {
      type: 'spring',
      duration: 0.1,
    },
  },
  open: {
    backgroundColor: 'var(--neutral-100)',
    transition: {
      type: 'spring',
      duration: 0.1,
    },
  },
};

const topLeftVariants = {
  closed: {
    rotate: 0,
    left: 0,
    top: '32.5%',
    y: '-50%',
    backgroundColor: 'var(--neutral-100)',
  },
  open: {
    rotate: 45,
    left: '5%',
    top: '42.5%',
    backgroundColor: 'var(--neutral-900)',
  },
};

const topRightVariants = {
  closed: {
    rotate: 0,
    left: '50%',
    top: '32.5%',
    y: '-50%',
    backgroundColor: 'var(--neutral-100)',
  },
  open: {
    rotate: -45,
    left: '45%',
    top: '42.5%',
    backgroundColor: 'var(--neutral-900)',
  },
};

const middleLeftVariants = {
  closed: {
    left: 0,
    top: '50%',
    opacity: 1,
    y: '-50%',
    backgroundColor: 'var(--neutral-100)',
  },
  open: {
    left: '-50%',
    top: '50%',
    opacity: 0,
    backgroundColor: 'var(--neutral-900)',
  },
};

const middleRightVariants = {
  closed: {
    left: '50%',
    top: '50%',
    opacity: 1,
    y: '-50%',
    backgroundColor: 'var(--neutral-100)',
  },
  open: {
    left: '100%',
    top: '50%',
    opacity: 0,
    backgroundColor: 'var(--neutral-900)',
  },
};

const bottomLeftVariants = {
  closed: {
    rotate: 0,
    left: 0,
    top: '67.5%',
    y: '-50%',
    backgroundColor: 'var(--neutral-100)',
  },
  open: {
    rotate: -45,
    left: '5%',
    top: '57.5%',
    backgroundColor: 'var(--neutral-900)',
  },
};

const bottomRightVariants = {
  closed: {
    rotate: 0,
    left: '50%',
    top: '67.5%',
    y: '-50%',
    backgroundColor: 'var(--neutral-100)',
  },
  open: {
    rotate: 45,
    left: '45%',
    top: '57.5%',
    backgroundColor: 'var(--neutral-900)',
  },
};

// Menu variants (MenuItem Variants are in MenuItem.tsx)

const menuVariants = {
  closed: {
    clipPath: 'circle(0% at 100% 0%)',
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
  open: {
    clipPath: 'circle(100% at 50% 50%)',
    opacity: 1,
    transition: {
      duration: 0.5,
      delayChildren: 0.4,
      staggerChildren: 0.2,
      staggerDirection: -1,
    },
  },
};

const navbarVariants = {
  initial: {
    opacity: 0,
    x: '-50%',
    y: 'calc(-1 * var(--navbar-height))',
    zIndex: 0,
  },
  animate: {
    opacity: 1,
    x: '-50%',
    y: 0,
    zIndex: 20,
    transition: {
      type: 'spring',
      bounce: 0,
      duration: `${NAVBAR_DURATION}`,
      delay: NAVBAR_DELAY,
    },
  },
};

// Navbar variants (NavItems variants are in NavItems.tsx)

export {
  bottomLeftVariants,
  bottomRightVariants,
  hamburgerVariants,
  menuVariants,
  middleLeftVariants,
  middleRightVariants,
  navbarVariants,
  topLeftVariants,
  topRightVariants,
};
