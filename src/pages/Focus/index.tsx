/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './index.module.css';
import {
  CustomerServiceOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  PoweroffOutlined,
  RightOutlined,
  TagOutlined,
} from '@ant-design/icons';
import { Form, Input, Modal, Popconfirm, Select } from 'antd';
import { useContext, useEffect, useState } from 'react';
import Son1 from '../../public/audio/song1.mp3';
import Son2 from '../../public/audio/song2.mp3';
import Son3 from '../../public/audio/song3.mp3';
import Son4 from '../../public/audio/song4.mp3';
import Son5 from '../../public/audio/song5.mp3';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../components/Context/AppAPI/AppAPI';
import useFetch from '../../../utils/useFetch';
import request from '../../../utils/request';
import Loading from '../../components/Loading';
import FunctionRightBar from '../../components/FunctionRightBar';
import useLoading from '../../../utils/useLoading';

const playMp3 = ['', Son1, Son2, Son3, Son4, Son5];

function SingleMusicItem({
  idx,
  src,
  title,
  author,
  play,
  onClick,
}: {
  idx: number;
  src: string;
  title: string;
  author: string;
  play: boolean;
  onClick: (arg1: any) => void;
}) {
  return (
    <section
      className={`${play ? styles.Play : ''} ${styles.SingleMusicContainer}`}
      onClick={() =>
        onClick({ open: false, song: { current: idx, title, author } })
      }
    >
      <div>{src && <img src={src} alt={title} />}</div>
      <h4>{title}</h4>
    </section>
  );
}

const initialState = {
  show: false,
  title: '',
};

function Focus() {
  const [form] = Form.useForm();
  const { search } = useLocation();
  const id = search.split('=')[1];
  const [initialTimes, setInitialTimes] = useState<{
    minutes: number;
    seconds: number;
    restMins: number;
  }>({
    minutes: 25,
    seconds: 0,
    restMins: 1,
  });
  const [musicToolShow, setMusicToolShow] = useState<boolean>(false);
  const [isRested, setIsRested] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [repeatTimes, setRepeatTimes] = useState<number>(1);
  const [time, setTime] = useState<{ minutes: number; seconds: number }>(
    initialTimes
  );
  const [singleRepeatTime, setSingleRepeatTime] = useState<number>(0);
  const [modalContent, setModalContent] = useState({
    open: false,
    song: {
      current: 0,
      title: '',
      author: '',
    },
  });
  const [modal, setModal] = useState<{ show: boolean; title: string }>(
    initialState
  );
  const { isFullScreen, handleScreenSwitch, handleScreenClose } =
    useContext(AppContext);

  const navigate = useNavigate();

  const { loading, data } = useFetch(
    async () => {
      return request.get(`/api/todo/${id}`);
    },
    [id],
    !!id
  );

  const { loading: groupLoading, data: groupData } = useFetch(
    async () => request.get('/api/todo-group'),
    [],
    !id
  );

  const { run } = useLoading(async () =>
    request.post(`api/todo/repeat/${id}`, {})
  );

  const switchStatus = () => {
    const isLastRepeat = !isRested && repeatTimes === 1;
    if (isLastRepeat && id) {
      // 调用次数加一接口
      // run();
      console.log(initialTimes.minutes - time.minutes);
      handleScreenClose!();
      navigate('/todo', { replace: true });
    } else if (isLastRepeat) {
      // 主页直接进入没有指定id的情况
      setIsPaused(true);
      setModal({ ...initialState, show: true });

      console.log(initialTimes.minutes - time.minutes);
    } else if (!isRested) {
      // 不是循环最后一次
      // 调用次数加一接口
      // run();
      console.log(initialTimes.minutes - time.minutes);

      // 设置休息时间
      setTime({ ...initialTimes, minutes: initialTimes.restMins });
      setRepeatTimes(repeatTimes - 1);
    } else {
      // 休息时长跳转专注时长
      setTime({ ...initialTimes });
    }

    setIsRested(!isRested);
  };

  const formatTick = () => {
    setTime(
      ({
        minutes: preMinutes,
        seconds: preSeconds,
      }: {
        minutes: number;
        seconds: number;
      }) => {
        if (preSeconds !== 0) {
          return { minutes: preMinutes, seconds: preSeconds - 1 };
        } else if (preMinutes !== 0) {
          return { minutes: preMinutes - 1, seconds: 59 };
        }

        return { minutes: 0, seconds: 0 };
      }
    );
  };

  useEffect(() => {
    let timerId: any;
    if (!isPaused) {
      timerId = setInterval(formatTick, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [isPaused]);

  useEffect(() => {
    if (time.minutes === 0 && time.seconds === 0) switchStatus();
  }, [time]);

  useEffect(() => {
    console.log({
      minutes: data.focus_time || initialTimes.minutes,
      seconds: 0,
      restMins: data.rest_time || initialTimes.restMins,
    });
    setInitialTimes({
      minutes: data.focus_time || initialTimes.minutes,
      seconds: 0,
      restMins: data.rest_time || initialTimes.restMins,
    });

    setTime({
      minutes: data.focus_time || initialTimes.minutes,
      seconds: 0,
    });
    setRepeatTimes(data.repeat || 1);
    setIsRested(false);
  }, [data]);

  const ExtendNode = (
    <FunctionRightBar
      isExtend={modal.show}
      handleCloseRightFuncBar={() => setModal({ ...initialState })}
      hideDelBtn={true}
      deleteFunc={() => {}}
    >
      <Form form={form}>
        <div className={styles.ModalContainer}>
          <header>
            <Form.Item noStyle name="title">
              <Input.TextArea
                placeholder="请输入你的待办主题"
                showCount
                autoSize
                maxLength={50}
              />
            </Form.Item>
          </header>
          <main className={styles.MainBarFuncs}>
            <div>
              <h4>
                关联待办集合 <TagOutlined />
              </h4>
              <Form.Item noStyle name="todo_group">
                <Select
                  allowClear
                  loading={groupLoading}
                  placeholder="请选择你的关联集，以作归类"
                  options={
                    groupData?.map(
                      ({
                        id: value,
                        title: label,
                      }: {
                        id: number;
                        title: string;
                      }) => ({ label, value })
                    ) || []
                  }
                  style={{
                    width: '100%',
                    minHeight: '4rem',
                  }}
                />
              </Form.Item>
            </div>
          </main>
          <div className={styles.ButtonContainer}>
            <button
              onClick={async () => {
                setModal({ ...initialState });
              }}
            >
              添加
            </button>
          </div>
        </div>
      </Form>
    </FunctionRightBar>
  );

  return (
    <Loading loading={loading} extendNode={ExtendNode}>
      <div className={`${styles.ClockPage} timeClock`}>
        {modalContent.song && (
          <div
            className={`${styles.PlayTool} ${
              musicToolShow ? styles.PlayToolHover : ''
            }`}
          >
            <div className={styles.PlayToolContainer}>
              {modalContent.song.current ? (
                <div className="flex item-center justify-between">
                  <div>
                    <h2>当前正在播放: {modalContent.song.title}</h2>
                    <h4>作者: {modalContent.song.author}</h4>
                  </div>
                  <div className={`rotate-items inline-block ${styles.CD}`}>
                    <svg
                      t="1702461582113"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="4275"
                      width="200"
                      height="200"
                    >
                      <path
                        d="M262 971.5c-91.2 0-165.5-74.2-165.5-165.5S170.8 640.5 262 640.5c22.1 0 40 17.9 40 40s-17.9 40-40 40c-47.1 0-85.5 38.3-85.5 85.5s38.3 85.5 85.5 85.5 85.5-38.3 85.5-85.5V262.3c0-17.2 11-32.5 27.4-37.9L876.8 57c12.2-4.1 25.6-2 36 5.5 10.4 7.5 16.6 19.6 16.6 32.4v543.7c0 91.2-74.2 165.5-165.5 165.5s-165.5-74.2-165.5-165.5S672.7 473.2 764 473.2c22.1 0 40 17.9 40 40s-17.9 40-40 40c-47.1 0-85.5 38.3-85.5 85.5s38.3 85.5 85.5 85.5 85.5-38.3 85.5-85.5V150.5l-422 140.6V806c0 91.3-74.2 165.5-165.5 165.5z"
                        fill="#32394E"
                        p-id="4276"
                      ></path>
                    </svg>
                  </div>
                </div>
              ) : (
                <h2 className="mb-3">当前无音乐播放</h2>
              )}
              <audio
                src={playMp3[modalContent.song.current]}
                autoPlay
                controls
                loop
              >
                <div>浏览器不支持音频播放</div>
              </audio>
              <p>本站音乐皆是无版权音乐，可以自由使用</p>
              <p>
                特别感谢{' '}
                <a
                  style={{ textDecoration: 'underline' }}
                  href="https://freepd.com"
                >
                  FreePd
                </a>{' '}
                提供资源
              </p>
              <div
                className={styles.ShowContainer}
                onClick={() => setMusicToolShow(!musicToolShow)}
              >
                <RightOutlined />
              </div>
            </div>
          </div>
        )}
        <main className={styles.Main}>
          <div className={styles.MottoContainer}>
            <div>
              <span>“</span>
              <span>世间是世间，我是我</span>
            </div>
          </div>
          <div className={styles.Clock}>
            <div className={styles.ClockProgress}>
              <div
                className={styles.Progress}
                // style={{
                //   animationDuration: `${minutes * 60 + seconds}s`,
                // }}
              ></div>
              <div className={styles.ClockStyle}>
                <h4>{data?.title || '无标题'}</h4>
                <h2>
                  {String(time.minutes).padStart(2, '0')}:
                  {String(time.seconds).padStart(2, '0')}
                </h2>
                <h3>{isRested ? '休息中' : '专注中'}</h3>
              </div>
            </div>
          </div>
        </main>
        <section className={styles.TimeCountdown} hidden={!id}>
          <div>
            <p>考研sssssssssssssssssssssssssssss</p>
            <h4>
              还剩 <strong>555</strong> 天
            </h4>
          </div>
        </section>
        <footer className={styles.MainFuncBtnsContainer}>
          <div
            className={isFullScreen ? styles.OrangeIcon : ''}
            onClick={handleScreenSwitch}
            title="全屏专注功能"
          >
            {isFullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
          </div>
          <div
            className={isPaused ? styles.GreenIcon : ''}
            onClick={() => setIsPaused((isPaused) => !isPaused)}
            title="暂停功能"
          >
            {!isPaused ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
          </div>
          <div
            className={modalContent.song.current ? styles.RedIcon : ''}
            onClick={() => setModalContent({ ...modalContent, open: true })}
            title="音乐功能"
          >
            <CustomerServiceOutlined />
          </div>
          <div title="结束功能">
            <Popconfirm
              placement="topLeft"
              title="提醒"
              description={
                isRested
                  ? '确认提前结束休息吗？确认离开休息页面！'
                  : '确定要提前结束这个番茄钟吗？确认将进入休息界面！'
              }
              okText="确认"
              cancelText="取消"
              onConfirm={switchStatus}
            >
              <PoweroffOutlined />
            </Popconfirm>
          </div>
        </footer>

        <Modal
          open={modalContent.open}
          onCancel={() => setModalContent({ ...modalContent, open: false })}
          closeIcon={null}
          footer={null}
        >
          <div className={styles.MusicContainer}>
            {[
              {
                src: '',
                title: '无',
              },
              {
                src: 'https://img1.baidu.com/it/u=2063240024,1206223653&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500',
                title: '阳光',
                author: 'Kevin MacLeod',
              },
              {
                src: 'https://img2.baidu.com/it/u=3798145951,2543638348&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1702573200&t=8aacdc4f4a47d02ce1a5483d4d4e72c9',
                title: '安逸',
                author: 'Kevin MacLeod',
              },
              {
                src: 'https://img0.baidu.com/it/u=3589787720,2797143709&fm=253&fmt=auto&app=138&f=JPEG?w=658&h=411',
                title: '森',
                author: 'dogsounds',
              },
              {
                src: 'https://img1.baidu.com/it/u=642504802,3995939092&fm=253&fmt=auto&app=138&f=JPEG?w=450&h=300',
                title: '探索',
                author: 'Kevin MacLeod',
              },
              {
                src: 'https://img2.baidu.com/it/u=2414465528,2801043078&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=334',
                title: '宁静',
                author: 'Kevin MacLeod',
              },
            ].map((item, idx) => (
              <SingleMusicItem
                key={idx}
                play={modalContent.song.current === idx}
                idx={idx}
                {...item}
                onClick={setModalContent}
              />
            ))}
          </div>
        </Modal>
      </div>
    </Loading>
  );
}

export default Focus;
