'use client';

import { useState } from 'react';
import styles from './styles.module.css';

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div
        className={`${styles.hamburgerOverlay} ${isOpen ? styles.open : ''}`}
      >
      </div>
    </>
  );
};

export default Hamburger;
