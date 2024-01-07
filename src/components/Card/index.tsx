import React, { ReactNode } from 'react';
import styles from './index.module.css';

const Card: React.FC<{
  title?: string | ReactNode;
  children?: ReactNode;
  className?: string;
  action?: ReactNode;
}> = ({ title, children, className, action }) => {
  return (
    <section
      className={`${styles.settingCard} shadow ${className}`}
      style={
        !title
          ? {
              paddingTop: '4rem',
            }
          : {}
      }
    >
      {title && (
        <h2 className={styles.settingHeadingTitle}>
          <div>{title}</div> <div>{action}</div>
        </h2>
      )}
      {children}
    </section>
  );
};

export default Card;
