import React from 'react';
import styles from './index.module.css';

const Segment: React.FC<{
  selections: string[];
  activeKey: number;
  width?: string | number;
  className?: string;
  onClick: (activeKey: number) => void;
}> = ({ selections, onClick, activeKey, className, width = '100%' }) => {
  return (
    <div className={`${styles.segment} ${className}`} style={{ width }}>
      {(selections || []).map((title: string, idx: number) => (
        <div
          key={idx}
          className={idx === activeKey ? styles.select : ''}
          onClick={() => onClick(idx)}
        >
          {title}
        </div>
      ))}
    </div>
  );
};

export default Segment;
