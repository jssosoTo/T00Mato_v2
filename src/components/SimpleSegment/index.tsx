import { useState } from 'react';
import styles from './index.module.css';

function SimpleSegment({
  className,
  selections,
  onChange,
}: {
  className?: string;
  selections: string[];
  onChange: (arg1: number) => void;
}) {
  const [activeKey, setActiveKey] = useState(0);

  return (
    <div className={`${className} ${styles.Segment}`}>
      <div className={`flex item-center ${styles.SelectionContainer}`}>
        {selections.map((text: string, idx: number) => (
          <div
            className={`${activeKey === idx ? styles.ActiveBtn : ''} ${
              styles.SingleSeg
            }`}
            onClick={() => {
              setActiveKey(idx);
              onChange?.(idx);
            }}
          >
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SimpleSegment;
