'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import Menu from './Menu';
import styles from './styles.module.css';
import {
  bottomLeftVariants,
  bottomRightVariants,
  hamburgerVariants,
  middleLeftVariants,
  middleRightVariants,
  topLeftVariants,
  topRightVariants,
} from './variants';

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  useEffect(() => {
    if (history.scrollRestoration && process.env.NODE_ENV === 'production') {
      history.scrollRestoration = 'manual';
    }

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
