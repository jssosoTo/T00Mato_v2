import {
  CalendarOutlined,
  DownOutlined,
  ScheduleOutlined,
  StarOutlined,
  TagOutlined,
  UpOutlined,
} from '@ant-design/icons';
import styles from './index.module.css';
import { ChangeEvent, useEffect, useState } from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';
import moment from 'moment';
import { weekdayChinese } from '../../globalConfig';
import ToDoItem from '../../components/ToDoItem';
import FunctionRightBar from '../../components/FunctionRightBar';
import { Input } from 'antd';

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

type ModalProps = {
  show?: boolean;
  id: string | number;
  title: string;
  focusTimes: number;
  timeLong: number;
  giveUpTimes: number;
  tomatoLong: number;
};

const initialState = {
  show: false,
  id: '',
  title: '',
  focusTimes: 0,
  timeLong: 0,
  giveUpTimes: 0,
  tomatoLong: 25,
};

function ToDo() {
  const [sortModalShow, setSortModalShow] = useState({
    show: false,
    sortWay: 0,
  });
  const [modalContent, setModalContent] = useState<ModalProps>(initialState);
  const [mockData, setMockData] = useState<ModalProps[]>([
    {
      id: 1,
      title: '吃饭',
      focusTimes: 2,
      timeLong: 60,
      giveUpTimes: 0,
      tomatoLong: 25,
    },
    {
      id: 3,
      title: '吃饭',
      focusTimes: 2,
      timeLong: 60,
      giveUpTimes: 0,
      tomatoLong: 25,
    },
    {
      id: 4,
      title: '吃饭',
      focusTimes: 2,
      timeLong: 60,
      giveUpTimes: 0,
      tomatoLong: 25,
    },
    {
      id: 5,
      title: '吃饭',
      focusTimes: 2,
      timeLong: 60,
      giveUpTimes: 0,
      tomatoLong: 25,
    },
    {
      id: 6,
      title: '吃饭',
      focusTimes: 2,
      timeLong: 60,
      giveUpTimes: 0,
      tomatoLong: 25,
    },
    {
      id: 7,
      title: '吃饭',
      focusTimes: 2,
      timeLong: 60,
      giveUpTimes: 0,
      tomatoLong: 25,
    },
    {
      id: 2,
      title:
        'testsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
      focusTimes: 1,
      timeLong: 60 * 6,
      giveUpTimes: 0,
      tomatoLong: 30,
    },
  ]);

  const handleChangeInput = (e: ChangeEvent) => {
    const name = e.target!.name;
    const value = e.target!.value;

    setModalContent({ ...modalContent, [name]: value });
  };

  const closeSortModal = () =>
    setSortModalShow((oldModalShow) => ({ ...oldModalShow, show: false }));

  useEffect(() => {
    document.addEventListener('click', closeSortModal);

    return () => removeEventListener('click', closeSortModal);
  }, []);

  return (
    <>
      <div className="flex-1 flex-all-center auto-scroll">
        <div className="main-container-xs h-full flex flex-column">
          <header className={styles.Header}>
            <div
              className={`flex justify-between item-center ${styles.HeaderTitle}`}
            >
              <h2>
                <ScheduleOutlined /> 待办
              </h2>
              <div className={styles.SortPosition}>
                <div
                  className={`${styles.SortContainer} flex item-center gap-1`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSortModalShow({ ...sortModalShow, show: true });
                  }}
                >
                  <Icon component={SortSvg} /> 排序
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
          <main className={`auto-scroll ${styles.MainContainer}`}>
            {mockData.map((item: ModalProps) => (
              <ToDoItem
                key={item.id}
                {...item}
                onClick={() =>
                  setModalContent({ ...modalContent, ...item, show: true })
                }
                src="/focus"
              />
            ))}
          </main>
        </div>
      </div>

      <FunctionRightBar
        isExtend={modalContent.show}
        handleCloseRightFuncBar={() =>
          setModalContent({ ...modalContent, show: false })
        }
        deleteFunc={() => alert('delete')}
      >
        <div className={styles.ModalContainer}>
          <header>
            <Input.TextArea
              placeholder="请输入你的主题名称"
              showCount
              autoSize
              id="title"
              name="title"
              value={modalContent.title}
              onChange={handleChangeInput}
              maxLength={50}
            />
          </header>
          <main className={styles.MainBarFuncs}>
            <section>
              <div>
                <TagOutlined />
              </div>
              <div>选择关联待办</div>
            </section>
            <section>
              <div>
                <CalendarOutlined />
              </div>
              <div>添加截止时间</div>
            </section>
            <section>
              <div>
                <StarOutlined />
                {/* <StarFilled /> */}
              </div>
              <div>在所有番茄钟中显示</div>
            </section>
          </main>
        </div>
      </FunctionRightBar>
    </>
  );
}

export default ToDo;
