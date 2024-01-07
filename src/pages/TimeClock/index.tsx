/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './index.module.css';
import {
  FireOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';
import { Modal, Popconfirm } from 'antd';
import { useContext, useEffect, useState } from 'react';
import Son1 from '../../public/audio/song1.mp3';
import Son2 from '../../public/audio/song2.mp3';
import Son3 from '../../public/audio/song3.mp3';
import Son4 from '../../public/audio/song4.mp3';
import Son5 from '../../public/audio/song5.mp3';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../components/Context/AppAPI/AppAPI';

const playMp3 = ['', Son1, Son2, Son3, Son4, Son5];

function SingleMusicItem({ idx, src, title, author, play, onClick }) {
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

function TimeClock({
  minutes = 25,
  seconds = 0,
  restMinutes = 0,
  restSeconds = 30,
}) {
  const [timeH, setTimeH] = useState(minutes);
  const [timeS, setTimeS] = useState(seconds);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isRested, setIsRested] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState({
    open: false,
    song: {
      current: 0,
      title: '',
      author: '',
    },
  });
  const { isFullScreen, handleScreenSwitch, handleScreenClose } =
    useContext(AppContext);

  const navigate = useNavigate();

  const restTime = () => {
    setIsRested(true);
    setTimeH(restMinutes);
    setTimeS(restSeconds);
  };
  const focusTime = () => {
    navigate('/todo', {
      replace: true,
    });
    // setIsRested(false);
    // setTimeH(minutes);
    // setTimeS(seconds);
  };

  const formatTick = () => {
    if (isPaused) return;
    setTimeS((oldS) => {
      if (oldS === 0) {
        setTimeH((timeH) => {
          if (timeH === 0) return 0;
          return timeH - 1;
        });
        return 59;
      }
      return oldS - 1;
    });
  };

  useEffect(() => {
    const timer = setInterval(formatTick, 1000);
    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    if (timeH === 0 && timeS === 0) {
      if (isRested) {
        focusTime();
      } else {
        restTime();
      }
    }
  }, [timeS]);

  return (
    <div className={`${styles.ClockPage} timeClock`}>
      {modalContent.song && (
        <div className={styles.PlayTool}>
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
              <h4>xxx</h4>
              <h2>
                {String(timeH).padStart(2, '0').slice(0, 2)}:
                {String(timeS).padStart(2, '0').slice(0, 2)}
              </h2>
              <h3>{isRested ? '休息中' : '专注中'}</h3>
            </div>
          </div>
        </div>
      </main>
      <section className={styles.TimeCountdown}>
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
          <FireOutlined />
        </div>
        <div title="结束功能">
          <Popconfirm
            placement="topLeft"
            title="提醒"
            description={
              isRested
                ? '确认提前结束休息吗？确认将回到主页面！'
                : '确定要提前结束这个番茄钟吗？确认将进入休息界面！'
            }
            okText="确认"
            cancelText="取消"
            onConfirm={() => {
              if (isRested) {
                handleScreenClose!();
                navigate('/todo', {
                  replace: true,
                });
              } else {
                setIsRested(!isRested);
                restTime();
              }
            }}
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
  );
}

export default TimeClock;
