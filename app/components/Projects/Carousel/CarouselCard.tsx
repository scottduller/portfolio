import type { PanInfo, Variants } from 'framer-motion';
import type { CarouselItemProps } from '.';
import { AnimatePresence, motion, wrap } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles.module.css';

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const buttonVariants: Variants = {
  initial: {
    y: -50,
    opacity: 0,
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.5,
    },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.5,
    },
  },
  exit: {
    y: 50,
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
    y: 20,
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

const cardVariants: Variants = {
  initial: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),

  animate: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

const CarouselCard = ({ projects, projectIndex, direction, paginate }: CarouselItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const wrappedProjectIndex = wrap(0, projects.length, projectIndex);
  const { name, github, website } = projects[wrappedProjectIndex];

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

  const onDragEnd = (_e: DragEvent, { offset, velocity }: PanInfo) => {
    setIsOpen(false);
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  return (
    <AnimatePresence initial={false} mode="wait" custom={direction}>
      <motion.div
        key={`${name}-card`}
        className={styles.carouselCard}
        variants={cardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        custom={direction}
        transition={{
          x: { type: 'spring', duration: 0.4, bounce: 0 },
          opacity: { duration: 0.2 },
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        dragMomentum={false}
        onDragEnd={onDragEnd}
      >
        <div className={styles.projectCardLeft}>
          <p>{name}</p>
        </div>
        <div className={styles.projectCardRight}>
          { (github || website) && (
            <>
              <motion.button
                ref={buttonRef}
                type="button"
                whileTap={{ scale: 0.8 }}
                className={`${styles.iconButton} ${isOpen ? styles.open : ''}`}
                onClick={() => setIsOpen((prevState) => !prevState)}
              >
                <AnimatePresence initial={false}>
                  {isOpen
                    ? (
                        <motion.div
                          className={styles.iconWrapper}
                          variants={buttonVariants}
                          initial="initial"
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
                          initial="initial"
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
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={github}
                      rel="noopener noreferrer"
                      target="_blank"
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
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={website}
                      rel="noopener noreferrer"
                      target="_blank"
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
          <p className={styles.number}>{wrappedProjectIndex.toString().padStart(2, '0')}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CarouselCard;
