import type { Variants } from 'framer-motion';
import type { Project } from '..';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

import { useEffect, useRef, useState } from 'react';
import styles from '../styles.module.css';

type Props = {
  project: Project;
  projectIndex: number;
};

const CarouselItem = ({ project: { name, github, website }, projectIndex }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInitial, setIsInitial] = useState(false);

  useEffect(() => {
    setIsInitial(true);
  }, []);

  const buttonVariants: Variants = {
    initial: {
      x: '-50%',
      y: '-200%',
      opacity: 0,
      transition: {
        type: 'spring',
        bounce: 0,
        duration: 0.5,
      },
    },
    animate: {
      x: '-50%',
      y: '-50%',
      opacity: 1,
      transition: {
        type: 'spring',
        bounce: 0,
        duration: 0.5,
      },
    },
    exit: {
      x: '-50%',
      y: '100%',
      opacity: 0,
      transition: {
        type: 'spring',
        bounce: 0,
        duration: 0.5,
      },
    },
  };

  const menuVariants: Variants = {
    closed: {
      clipPath: 'circle(0% at 100% 0%)',
      opacity: 0,
      transition: {
        type: 'spring',
        bounce: 0,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      clipPath: 'circle(100% at 50% 50%)',
      opacity: 1,
      transition: {
        type: 'spring',
        bounce: 0,
        delayChildren: 0.2,
        staggerChildren: 0.07,
      },
    },
  };

  const menuItemVariants: Variants = {
    closed: {
      opacity: 0,
      y: 10,
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0,
        duration: 0.6,
      },
    },
  };

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.carouselItem}>
      <div className={styles.projectCard}>
        <div>
          <p>{name}</p>
        </div>
        <div className={styles.projectCardRight}>
          { (github || website) && (
            <>
              <motion.button
                ref={buttonRef}
                type="button"
                whileTap={{ scale: 0.8 }}
                className={styles.iconButton}
                onClick={() => setIsOpen((prevState) => !prevState)}
              >
                <AnimatePresence>
                  {isOpen
                    ? (
                        <motion.div
                          className={styles.iconWrapper}
                          variants={buttonVariants}
                          initial={isInitial ? 'initial' : false}
                          animate="animate"
                          exit="exit"
                          key="open"
                          transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className={styles.icon}
                          >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </motion.div>
                      )
                    : (
                        <motion.div
                          className={styles.iconWrapper}
                          variants={buttonVariants}
                          initial={isInitial ? 'initial' : false}
                          animate="animate"
                          exit="exit"
                          key="closed"
                          transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className={styles.icon}
                          >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                        </motion.div>
                      )}
                </AnimatePresence>
              </motion.button>

              <motion.div className={styles.linkMenu} ref={menuRef} variants={menuVariants} initial="closed" animate={isOpen ? 'open' : 'closed'}>
                {github && (
                  <motion.div
                    variants={menuItemVariants}
                    className={`${styles.item} ${styles.github}`}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link
                      href={github}

                    >
                      <motion.span>
                        Github
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className={styles.icon}
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </motion.span>
                    </Link>
                  </motion.div>
                )}
                {website && (
                  <motion.div
                    variants={menuItemVariants}
                    className={`${styles.item} ${styles.website}`}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link
                      href={website}
                    >
                      <motion.span>
                        Website
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className={styles.icon}
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </motion.span>
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            </>
          )}
          {projectIndex.toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

export default CarouselItem;
