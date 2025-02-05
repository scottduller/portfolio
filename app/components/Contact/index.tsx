import * as motion from 'motion/react-client';
import React from 'react';
import { contentVariants, wrapperVariants } from '../globalVariants';
import ContactCard from './ContactCard';
import styles from './styles.module.css';

const Contact = () => {
  return (
    <motion.div className={styles.wrapper} variants={wrapperVariants} initial="hidden" whileInView="visible" viewport={{ margin: '-25% 0px -25% 0px', once: true }}>
      <motion.div variants={contentVariants} className="header">
        <h2>03.</h2>
        <h2>CONTACT</h2>
      </motion.div>
      <div className={styles.contactGrid}>
        <div className={styles.description}>
          <motion.strong variants={contentVariants}>
            Let's Talk
          </motion.strong>
          <motion.p variants={contentVariants}>
            Let's bring your ideas to life. Whether you have a project in mind or need a solution, reach out and let's create something exceptional together.
          </motion.p>
        </div>
        <motion.div className={styles.contactCard} whileTap={{ scale: 0.975 }} whileHover={{ scale: 1.025 }} variants={contentVariants}>
          <ContactCard name="Email" urlName="s.o.duller@gmail.com" href="mailto:s.o.duller@gmail.com" number={0} />
        </motion.div>
        <motion.div className={styles.contactCard} whileTap={{ scale: 0.975 }} whileHover={{ scale: 1.025 }} variants={contentVariants}>
          <ContactCard name="Github" urlName="scottduller" href="https://github.com/scottduller" number={1} />
        </motion.div>
        <motion.div className={styles.contactCard} whileTap={{ scale: 0.975 }} whileHover={{ scale: 1.025 }} variants={contentVariants}>
          <ContactCard name="LinkedIn" urlName="scottduller" href="https://www.linkedin.com/in/scottduller/" number={2} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
