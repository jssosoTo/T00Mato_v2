import styles from './index.module.css';

function TargetCard() {
  return (
    <section className={styles.TargetCard}>
      <h2 className={styles.TargetTitle}>
        距离 <strong>{'考研'}</strong> 还剩
      </h2>
      <h4 className={styles.TargetDays}>
        365<span>天</span>
      </h4>
      <p className={styles.Intro}>当前选中未来时间轴，将会在番茄钟中显示</p>
    </section>
  );
}

export default TargetCard;
