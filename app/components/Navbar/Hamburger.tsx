'use client';

import { InViewContext } from '@/context';
import { motion, type Variants } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import styles from './styles.module.css';

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  const hamburgerVariants: Variants = {
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

  const topLeftVariants: Variants = {
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

  const topRightVariants: Variants = {
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

  const middleLeftVariants: Variants = {
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

  const middleRightVariants: Variants = {
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

  const bottomLeftVariants: Variants = {
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

  const bottomRightVariants: Variants = {
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

  const menuVariants: Variants = {
    closed: {
      clipPath: 'circle(0% at 100% 0%)',
      opacity: 0,
      transition: {
        type: 'spring',
        bounce: 0,
        duration: 0.7,
      },
    },
    open: {
      clipPath: 'circle(100% at 50% 50%)',
      opacity: 1,
      transition: {
        type: 'spring',
        bounce: 0,
        duration: 1.5,
        delayChildren: 0.4,
        staggerChildren: 0.15,
        staggerDirection: -1,
      },
    },
  };

  const { inView } = useContext(InViewContext);

  const menuItemVariants: Variants = {
    closed: {
      opacity: 0,
      x: 100,
      flexGrow: 0,
    },
    open: (index: number) => ({
      opacity: 1,
      x: 0,
      flexGrow: inView[index].scrollProgress,
      transition: {
        type: 'spring',
        bounce: 0,
        duration: 0.6,
      },
    }),
  };

  useEffect(() => {
    if (history.scrollRestoration && process.env.NODE_ENV === 'production') {
      history.scrollRestoration = 'manual';
    }

    window.addEventListener('popstate', (current) => {
      if (!current.state?.menuOpen) {
        setIsOpen(false);
      }
    });
  }, []);

  const handleMenuToggle = () => {
    if (isOpen) {
      window.history.back();
      setIsOpen(false);
    } else {
      window.history.pushState({ menuOpen: true }, '');
      setIsOpen(true);
    }
  };

  const handleMenuItemClick = (section: number) => {
    const sectionRef = inView[section].ref;
    sectionRef?.current?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
    window.history.back();
  };

  return (
    <>
      <motion.button
        type="button"
        className={`${styles.hamburger}`}
        onClick={handleMenuToggle}
        whileTap={{ scale: 0.8 }}
        variants={hamburgerVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
      >
        <motion.span
          variants={topLeftVariants}
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
        />
        <motion.span
          variants={topRightVariants}
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
        />

        <motion.span
          variants={middleLeftVariants}
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
        />

        <motion.span
          variants={middleRightVariants}
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
        />

        <motion.span
          variants={bottomLeftVariants}
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
        />
        <motion.span
          variants={bottomRightVariants}
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
        />
      </motion.button>
      <motion.div
        className={styles.menu}
        variants={menuVariants}
        initial="closed"
        animate={isOpen ? 'open' : 'closed'}
      >
        <motion.button
          type="button"
          onClick={() => handleMenuItemClick(0)}
          className={`${styles.item} ${styles.home}`}
          variants={menuItemVariants}
          whileTap={{ scale: 0.9 }}
          custom={0}
        >
          <motion.div className={styles.title}>Home</motion.div>
          <motion.div className={styles.number}>00</motion.div>
        </motion.button>
        <motion.button
          type="button"
          onClick={() => handleMenuItemClick(1)}
          className={`${styles.item} ${styles.projects}`}
          variants={menuItemVariants}
          whileTap={{ scale: 0.9 }}
          custom={1}
        >
          <motion.div className={styles.title}>Projects</motion.div>
          <motion.div className={styles.number}>01</motion.div>
        </motion.button>
        <motion.button
          type="button"
          onClick={() => handleMenuItemClick(2)}
          className={`${styles.item} ${styles.about}`}
          variants={menuItemVariants}
          whileTap={{ scale: 0.9 }}
          custom={2}
        >
          <motion.div className={styles.title}>About</motion.div>
          <motion.div className={styles.number}>02</motion.div>
        </motion.button>
        <motion.button
          type="button"
          onClick={() => handleMenuItemClick(3)}
          className={`${styles.item} ${styles.contact}`}
          variants={menuItemVariants}
          whileTap={{ scale: 0.9 }}
          custom={3}
        >
          <motion.div className={styles.title}>Contact</motion.div>
          <motion.div className={styles.number}>03</motion.div>
        </motion.button>
      </motion.div>
    </>
  );
};

export default Hamburger;
