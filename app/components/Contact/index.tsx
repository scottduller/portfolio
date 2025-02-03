import * as motion from 'motion/react-client';
import React from 'react';
import ContactCard from './ContactCard';
import styles from './styles.module.css';

const headerVariants = {
  visible: {
    opacity: 1,
    width: '100%',
    transition: {
      duration: 0.5,
      delayChildren: 0.5,
    }
  },
  hidden: {
    width: '0%',
    opacity: 0,
  },
};

const headerTextVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    }
  },
  hidden: {
    opacity: 0,
    y: 20,
  },
};

const contentsWrapperVariants = {
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 1,
      duration: 0.5,
      staggerChildren: 1,
    }
  },
  hidden: {
    opacity: 0,
  },
};

const contentsVariants = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.5,
    }
  },
  hidden: {
    opacity: 0,
  },
};

const linksVariants = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.5,
    }
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
    }
  },
  hidden: {
    opacity: 0,
    y: 20,
  },
};

const Contact = () => {
  return (
    <div className={styles.wrapper}>
      <motion.div variants={headerVariants} initial="hidden" whileInView="visible" className={styles.header} viewport={{ once: true }}>
        <motion.h2 variants={headerTextVariants}>Contact</motion.h2>
        <motion.h2 variants={headerTextVariants}>03</motion.h2>
      </motion.div>
      <motion.div variants={contentsWrapperVariants} initial="hidden" whileInView="visible" className={styles.content} viewport={{ once: true }}>
        <motion.div variants={contentsVariants} className={styles.description}>
          <motion.strong variants={contentVariants}>
            Let's Talk
          </motion.strong>
          <motion.p variants={contentVariants}>
            Let's bring your ideas to life. Whether you have a project in mind or need a solution, reach out and let's create something exceptional together.
          </motion.p>
        </motion.div>
        <motion.div variants={linksVariants} className={styles.contactCards}>
          <motion.div className={styles.contactCard} variants={contentVariants}>
            <ContactCard name="Email" urlName="s.o.duller@gmail.com" href="mailto:s.o.duller@gmail.com" number={0} />
          </motion.div>
          <motion.div className={styles.contactCard} variants={contentVariants}>
            <ContactCard name="Github" urlName="scottduller" href="https://github.com/scottduller" number={1} />
          </motion.div>
          <motion.div className={styles.contactCard} variants={contentVariants}>
            <ContactCard name="LinkedIn" urlName="scottduller" href="https://www.linkedin.com/in/scottduller/" number={2} />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;
