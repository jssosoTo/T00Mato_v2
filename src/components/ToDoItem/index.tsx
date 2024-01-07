import { useNavigate } from 'react-router-dom';
import { ToDoProps } from '../../pages/ToDo';
import styles from './index.module.css';

const ToDoItem: React.FC<ToDoProps> = ({
  id,
  title,
  tomatoLong,
  focusTimes,
  timeLong,
  giveUpTimes,
  onClick,
  src,
}) => {
  const navigate = useNavigate();

  return (
    <section
      className={`rounded ${styles.todoContainer}`}
      onClick={() =>
        onClick({
          open: true,
          id,
          title,
          focusTimes,
          timeLong,
          giveUpTimes,
          tomatoLong,
        })
      }
    >
      <div className={styles.infoContainer}>
        <h2>{title}</h2>
        <h4>{tomatoLong} 分钟</h4>
      </div>
      <div
        className={styles.startBtn}
        onClick={(e) => {
          e.stopPropagation();
          navigate(src);
        }}
      >
        开始
      </div>
    </section>
  );
};

export default ToDoItem;
