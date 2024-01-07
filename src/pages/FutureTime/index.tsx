/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CalendarOutlined,
  HourglassOutlined,
  PlusOutlined,
  StarFilled,
  StarOutlined,
  TagOutlined,
} from '@ant-design/icons';
import Countdown from './Countdown';
import TargetCard from './TargetCard';
import styles from './index.module.css';
import { ChangeEvent, useState } from 'react';
import moment from 'moment';
import dateFormatToChinese from '../../../utils/dateFormatToChinese';
import FunctionRightBar from '../../components/FunctionRightBar';
import { Input, Modal } from 'antd';

const initialState = {
  show: false,
  id: '',
  title: '',
  startTime: '',
  connections: [],
};

function FutureTime() {
  const [mockData, setMockData] = useState([
    {
      id: '15844944',
      header: '随机测试title',
      startTime: '2024-1-23',
      connections: [],
    },
    {
      id: '15842545454',
      header:
        '超级测试随机无敌乱七八糟随随便便任意添加这个自己未意识未定义的超长垃圾毫无意义毫无信息的超长乐色标题',
      startTime: '2024-1-1',
      connections: [],
    },

    {
      id: '15dsda4944',
      header: '随机测试title',
      startTime: '2024-1-2',
      connections: [],
    },

    {
      id: '158663434344',
      header: '随机测试title',
      startTime: '2024-1-4',
      connections: [],
    },

    {
      id: '158232523325944',
      header: '随机测试title',
      startTime: '2024-2-4',
      connections: [],
    },

    {
      id: '1584254545pppzz4',
      header:
        '超级测试随机无敌乱七八糟随随便便任意添加这个自己未意识未定义的超长垃圾毫无意义毫无信息的超长乐色标题',
      startTime: '2023-12-3',
      connections: [],
    },

    {
      id: '152432234323325944',
      header: '随机测试title',
      startTime: '2024-1-3',
      connections: [],
    },
  ]);
  const [modalContent, setModalContent] = useState(initialState);

  const handleChangeInput = (e: ChangeEvent) => {
    const name = e.target!.name;
    const value = e.target!.value;

    setModalContent({ ...modalContent, [name]: value });
  };

  return (
    <>
      <div className="flex-1 auto-scroll pb-3">
        <div className="grid grid-col-2pro gap-x-5 my-2">
          <Countdown />
          <TargetCard />
        </div>
        <div className={`main-container-xs mx-auto`}>
          <div className="flex item-center justify-between">
            <h2 className={styles.FuncTitle}>
              <HourglassOutlined /> 未来时间轴
            </h2>
            <div>
              <div
                className={`${styles.SortContainer} flex item-center gap-1`}
                onClick={() => setModalContent({ ...modalContent, show: true })}
              >
                <PlusOutlined /> 添加
              </div>
            </div>
          </div>
          <main className={`${styles.MainShowContainer}`}>
            {mockData.map((item) => {
              const { header: title, startTime, connections, id } = item;
              const dateText = dateFormatToChinese(
                moment(startTime).fromNow()
              ).split(' ');

              return (
                <div
                  key={item.id}
                  className={styles.TimeCard}
                  onClick={() =>
                    setModalContent({
                      ...modalContent,
                      title,
                      startTime,
                      connections,
                      id,
                      show: true,
                    })
                  }
                >
                  <h4 title={title} className={styles.CardTitle}>
                    {title}
                  </h4>
                  <h6>
                    {dateText[0]} <span>{dateText[1]}</span> {dateText[2]}
                  </h6>
                  <p>{moment(startTime).format('YYYY-MM-DD')}</p>
                </div>
              );
            })}
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
              placeholder="请输入你的目标"
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

export default FutureTime;
