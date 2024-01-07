import { useEffect, useState } from 'react';
import styles from './index.module.css';
import moment from 'moment';

function Countdown() {
  const currentDate = moment();
  const tomorrow = moment().add(1, 'day').startOf('day');
  const remainingTime = tomorrow.diff(currentDate);
  const [restHours, setRestHours] = useState(
    Math.trunc(remainingTime / 1000 / 60 / 60)
  );
  const [restMins, setRestMins] = useState(
    Math.trunc((remainingTime / 1000 / 60) % 60)
  );
  const [restSeconds, setRestSeconds] = useState(
    Math.trunc((remainingTime / 1000) % 60)
  );

  const tickTime = () => {
    const remainingTime = tomorrow.diff(moment());
    setRestHours(Math.trunc(remainingTime / 1000 / 60 / 60));
    setRestMins(Math.trunc((remainingTime / 1000 / 60) % 60));
    setRestSeconds(Math.trunc((remainingTime / 1000) % 60));
  };

  useEffect(() => {
    const timerId = setInterval(tickTime, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <section className={styles.CountDownCard}>
      <h2 className={styles.CountDownTitle}>距离今日结束还剩</h2>
      <h4 className={styles.CountDownDay}>
        {moment().format('YYYY 年 M 月 D 日')}
      </h4>
      <div className={styles.CountDownTime}>
        <span>{restHours.toString().padStart(2, '0')}</span>:
        <span>{restMins.toString().padStart(2, '0')}</span>:
        <span>{restSeconds.toString().padStart(2, '0')}</span>
      </div>
    </section>
  );
}

export default Countdown;
