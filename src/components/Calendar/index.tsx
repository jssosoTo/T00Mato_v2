import moment from 'moment';
import { weekdayChinese } from '../../globalConfig';
import styles from './index.module.css';

function Calendar() {
  const now = moment().date();
  const weeks = new Array(7)
    .fill('')
    .map((_, idx: number) => moment().startOf('week').add(idx, 'days').date());

  return (
    <div className={styles.Card}>
      <h2 className={styles.Title}>日历</h2>
      <div className={styles.Calendar}>
        <div className={styles.weekTextContainer}>
          {weekdayChinese.map((day: string, idx: number) => (
            <span key={idx}>{day}</span>
          ))}
        </div>
        <div className={styles.weekContainer}>
          {weeks.map((day: number, idx: number) => (
            <span key={idx} className={now === day ? styles.Today : ''}>
              {day}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
