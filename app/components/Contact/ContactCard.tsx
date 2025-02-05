import Link from 'next/link';
import React from 'react';
import styles from './styles.module.css';

type ContactCardProps = {
  name: string;
  urlName: string;
  href: string;
  number: number;
};

const ContactCard = ({ name, urlName, href, number }: ContactCardProps) => {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <div className={styles.contactCardTop}>
        <strong className={styles.contactCardName}>{name}</strong>
        <p className={styles.contactCardNumber}>{number.toString().padStart(2, '0')}</p>
      </div>
      <div className={styles.contactCardBottom}>
        <div className={styles.contactCardLink}>
          <span>{urlName}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className={styles.icon}
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </div>
      </div>

    </Link>
  );
};

export default ContactCard;
