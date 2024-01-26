import { useNavigate } from 'react-router-dom';
import { ToDoProps } from '../../pages/ToDo';
import styles from './index.module.css';

const ToDoItem: React.FC<ToDoProps> = ({
  id,
  title,
  detail,
  repeat,
  repeat_date,
  repeat_type,
  fail_repeat,
  success_repeat,
  rest_time,
  focus_time,
  total_time,
  create_at,
  update_at,
  todo_group,
  onClick,
  src,
}) => {
  const navigate = useNavigate();

  return (
    <section
      className={`rounded ${styles.todoContainer}`}
      onClick={() =>
        onClick({
          show: true,
          id,
          title,
          detail,
          repeat,
          repeat_date,
          repeat_type,
          fail_repeat,
          success_repeat,
          rest_time,
          focus_time,
          total_time,
          create_at,
          update_at,
          todo_group: todo_group || [],
        })
      }
    >
      <div className={styles.infoContainer}>
        <h2>{title}</h2>
        <h4>{focus_time} 分钟</h4>
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
