import { useEffect, useState } from 'react';
import styles from './index.module.css';
import {
  BookOutlined,
  DownOutlined,
  EditOutlined,
  ReloadOutlined,
  UpOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import { weekdayChinese } from '../../globalConfig';
import Icon from '@ant-design/icons/lib/components/Icon';
import DiaryCard from '../../components/DiaryCard';
import { useNavigate } from 'react-router-dom';
import request from '../../../utils/request';
import useFetch from '../../../utils/useFetch';
import { Empty, Spin } from 'antd';

export type DataProps = {
  id: number;
  title: string;
  content: string;
  create_at: string;
  update_at: string;
};

const SortSvg = () => (
  <svg
    t="1704177192620"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="1456"
    width="18"
    height="18"
  >
    <path
      d="M673.158095 252.830476v634.026667h-71.923809V172.251429c0-10.142476 4.022857-19.846095 11.215238-26.989715a38.546286 38.546286 0 0 1 54.296381 0L926.47619 403.553524l-50.883047 50.566095-202.435048-201.289143zM350.841905 768.121905V134.095238h71.923809v719.823238l-0.902095 6.460953c-1.26781 8.045714-2.56 9.728-9.703619 18.992761l-8.045714 4.388572c-17.92 9.45981-20.577524 7.996952-43.154286-4.388572L97.52381 617.374476l50.883047-50.541714 202.435048 201.264762z"
      p-id="1457"
    ></path>
  </svg>
);

function Diary() {
  const [sortModalShow, setSortModalShow] = useState({
    show: false,
    sortWay: 0,
  });
  const navigate = useNavigate();

  const closeSortModal = () =>
    setSortModalShow((oldModalShow) => ({ ...oldModalShow, show: false }));

  useEffect(() => {
    document.addEventListener('click', closeSortModal);

    return () => removeEventListener('click', closeSortModal);
  }, []);

  const { loading, data, run } = useFetch(async () => {
    return request.get('api/notes');
  }, []);

  return (
    <div className="flex-1 flex justify-center auto-scroll">
      <div className="main-container-xs">
        <header className={`${styles.HeaderTitle}`}>
          <div className="flex justify-between item-center">
            <h2>
              <BookOutlined /> 日记
            </h2>
            <div className={styles.SortPosition}>
              <div
                className={`${styles.SortContainer} flex item-center gap-1`}
                onClick={run}
              >
                <ReloadOutlined /> 刷新
              </div>
              <div
                className={`${styles.SortContainer} flex item-center gap-1`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSortModalShow({ ...sortModalShow, show: true });
                }}
              >
                <Icon component={SortSvg} /> 排序
              </div>
              <div
                className={`${styles.SortContainer} flex item-center gap-1`}
                onClick={() => navigate('/diary/detail')}
              >
                <EditOutlined /> 写日记
              </div>
              {sortModalShow.show && (
                <div className={styles.SortModal}>
                  <h4>排序依据</h4>
                  <ul>
                    <li
                      className={
                        sortModalShow.sortWay === 0 ? styles.SelectedWay : ''
                      }
                      onClick={() =>
                        setSortModalShow({ ...sortModalShow, sortWay: 0 })
                      }
                    >
                      <span>
                        <UpOutlined />
                      </span>
                      <span>创建时间（最新最前）</span>
                    </li>
                    <li
                      className={
                        sortModalShow.sortWay === 1 ? styles.SelectedWay : ''
                      }
                      onClick={() =>
                        setSortModalShow({ ...sortModalShow, sortWay: 1 })
                      }
                    >
                      <span>
                        <DownOutlined />
                      </span>
                      <span>创建时间（最旧最前）</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <p>
            {moment().format('YYYY年MM月DD日')} 星期
            {weekdayChinese[moment().day()]}
          </p>
        </header>

        <Spin spinning={loading}>
          <main className={styles.DiaryContainer}>
            {data
              .slice()
              .sort(
                sortModalShow.sortWay === 0
                  ? (a: DataProps, b: DataProps) =>
                      moment(b['create_at']).valueOf() -
                      moment(a['create_at']).valueOf()
                  : (a: DataProps, b: DataProps) =>
                      moment(a['create_at']).valueOf() -
                      moment(b['create_at']).valueOf()
              )
              .map((item: DataProps) => (
                <DiaryCard key={item.id} {...item} />
              ))}
            {!(data || []).length && (
              <Empty
                className="m-auto grid-col-3"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={'还没添加待办，快速添加吧~~'}
              />
            )}
          </main>
        </Spin>
      </div>
    </div>
  );
}

export default Diary;
