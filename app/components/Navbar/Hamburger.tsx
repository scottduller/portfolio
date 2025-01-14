'use client';

import { InViewContext } from '@/context';
import { motion, type Variants } from 'framer-motion';
import Link from 'next/link';
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
      backgroundColor: 'var(--neutral-200)',
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
        duration: 1.5,
        type: 'spring',
        bounce: 0,
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

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = () => {
    setIsOpen(false);
  };

  // TODO: Remove # navigation (to stop scrolling to tagged section on reload/browswer navigation)
  // TODO: Make it so that when you navigate in the browser, pressing back on the nav menu will close it and not navigate to the previous page
  // NOTE: This maybe a case where it is one or the other, but I'm not sure

  const MotionLink = motion.create(Link);

  return (
    <>
      <motion.button
        type="button"
        className={`${styles.hamburger}`}
        onClick={handleMenuToggle}
        whileTap={{ scale: 0.9 }}
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
        <MotionLink
          href="#home"
          replace
          onClick={handleMenuItemClick}
          className={`${styles.item} ${styles.home}`}
          variants={menuItemVariants}
          custom={0}
        >
          <motion.div className={styles.title}>Home</motion.div>
          <motion.div className={styles.number}>00</motion.div>
        </MotionLink>
        <MotionLink
          href="#projects"
          replace
          onClick={handleMenuItemClick}
          className={`${styles.item} ${styles.projects}`}
          variants={menuItemVariants}
          custom={1}
        >
          <motion.div className={styles.title}>Projects</motion.div>
          <motion.div className={styles.number}>01</motion.div>
        </MotionLink>
        <MotionLink
          href="#about"
          replace
          onClick={handleMenuItemClick}
          className={`${styles.item} ${styles.about}`}
          variants={menuItemVariants}
          custom={2}
        >
          <motion.div className={styles.title}>About</motion.div>
          <motion.div className={styles.number}>02</motion.div>
        </MotionLink>
        <MotionLink
          href="#contact"
          replace
          onClick={handleMenuItemClick}
          className={`${styles.item} ${styles.contact}`}
          variants={menuItemVariants}
          custom={3}
        >
          <motion.div className={styles.title}>Contact</motion.div>
          <motion.div className={styles.number}>03</motion.div>
        </MotionLink>
      </motion.div>
    </>
  );
};

export default Hamburger;
