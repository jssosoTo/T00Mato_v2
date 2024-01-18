/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';
import styles from './index.module.css';
import moment from 'moment';
import { weekdayChinese } from '../../globalConfig';
import { Popconfirm } from 'antd';

type FuncProps = {
  name: string;
  icon: ReactNode;
  onClick?: (arg1?: any) => void;
  confirm?: {
    title: string;
    description: string;
    okText?: string;
    cancelText?: string;
    onConfirm: any;
    onCancel?: any;
  };
};

function PageHeader({
  icon,
  title,
  funcs,
  children,
  needTime,
  sortModalShow,
  sortArr,
}: {
  icon: ReactNode;
  title: string;
  funcs?: FuncProps[];
  children: ReactNode;
  needTime?: boolean;
  sortModalShow?: {
    show: boolean;
    sortWay: number;
    title: string;
  };
  sortArr?: FuncProps[];
}) {
  return (
    <div className="flex-1 flex-all-center auto-scroll">
      <div className="main-container-xs h-full flex flex-column">
        <header className={styles.Header}>
          <div
            className={`flex justify-between item-center ${styles.HeaderTitle}`}
          >
            <h2>
              {icon} {title}
            </h2>
            <div className={styles.SortPosition}>
              {funcs?.map((item: FuncProps, idx: number) =>
                item.confirm ? (
                  <Popconfirm {...item.confirm}>
                    <div
                      key={idx}
                      className={`${styles.SortContainer} flex item-center gap-1`}
                    >
                      {item.icon} {item.name}
                    </div>
                  </Popconfirm>
                ) : (
                  <div
                    key={idx}
                    className={`${styles.SortContainer} flex item-center gap-1`}
                    onClick={item.onClick}
                  >
                    {item.icon} {item.name}
                  </div>
                )
              )}

              {sortModalShow?.show && (
                <div className={styles.SortModal}>
                  <h4>{sortModalShow.title}</h4>
                  <ul>
                    {(sortArr || []).map((item: FuncProps, idx: number) => (
                      <li
                        key={idx}
                        className={
                          sortModalShow?.sortWay === idx
                            ? styles.SelectedWay
                            : ''
                        }
                        onClick={item.onClick}
                      >
                        <span>{item.icon}</span>
                        <span>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          {needTime && (
            <p>
              {moment().format('YYYY年MM月DD日')} 星期
              {weekdayChinese[moment().day()]}
            </p>
          )}
        </header>
        {children}
      </div>
    </div>
  );
}

export default PageHeader;
