'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import Menu from './Menu';
import styles from './styles.module.css';

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

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

  useEffect(() => {
    // if (history.scrollRestoration && process.env.NODE_ENV === 'production') {
    //   history.scrollRestoration = 'manual';
    // }

    history.scrollRestoration = 'manual';

    window.addEventListener('popstate', (current) => {
      if (!current.state?.menuOpen) {
        setIsOpen(false);
      }
    });

    return () => {
      window.removeEventListener('popstate', () => {});
    };
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

  return (
    <>
      <motion.button
        type="button"
        className={`${styles.hamburger}`}
        onClick={handleMenuToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
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
      <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Hamburger;
