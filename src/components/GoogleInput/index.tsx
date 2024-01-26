import { CSSProperties, ChangeEvent, useRef, useState } from 'react';
import styles from './index.module.css';

function GoogleInput({
  label,
  className,
  style,
  value,
  onChange,
}: {
  label: string;
  className?: string;
  style?: CSSProperties;
  value?: string;
  onChange?: (arg1: ChangeEvent) => void;
}) {
  const [isHide, setIsHide] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef(null);

  const formatValue = value === undefined ? inputValue : value;

  return (
    <div className={`${className} ${styles.GoogleInput}`} style={style}>
      <input
        ref={inputRef}
        value={formatValue}
        onChange={onChange || ((e) => setInputValue(e.target.value))}
        onFocus={() => setIsHide(false)}
        onBlur={() => setIsHide(true)}
      />
      <div
        className={`${styles.GoogleInputPlaceholder} ${
          isHide && formatValue.length === 0
            ? styles.HideInput
            : styles.LabelInput
        }`}
        onClick={() => inputRef.current.focus()}
      >
        {label}
      </div>
    </div>
  );
}

export default GoogleInput;
