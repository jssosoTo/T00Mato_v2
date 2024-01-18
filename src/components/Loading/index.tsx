/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoadingOutlined } from '@ant-design/icons';
import styles from './index.module.css';
import { ReactNode } from 'react';

export default function Loading({
  children,
  className,
  style,
  loading,
  extendNode,
}: {
  children: ReactNode;
  className?: string;
  style?: any;
  loading: boolean;
  extendNode?: ReactNode;
}) {
  return (
    <>
      <div
        className={`flex-1 flex justify-center ${className} ${styles.LoadingContainer}`}
        style={style}
      >
        {children}

        {extendNode}
        <div className={`${styles.Loading} ${loading ? styles.Active : ''}`}>
          <LoadingOutlined />
        </div>
      </div>
    </>
  );
}
