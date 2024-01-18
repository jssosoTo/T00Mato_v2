import moment from 'moment';
import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';
import { DataProps } from '../../pages/Diary';
import Markdown from 'markdown-to-jsx';

function DiaryCard({ id, content, create_at, title }: DataProps) {
  const navigate = useNavigate();

  return (
    <div className={styles.Card}>
      <div className={styles.ParagraphContainer}>
        <div
          className={styles.ShortShowContainer}
          onClick={() => navigate(`/diary/detail/${id}`)}
        >
          {content?.split('\n').map((p: string, idx: number) => (
            <Markdown key={idx}>{p.replace(/\s/g, '&nbsp;')}</Markdown>
          ))}
        </div>
      </div>
      <div className={styles.InfoContainer}>
        <h6>{title}</h6>
        <div>{moment(create_at).utc().format('YYYY/MM/DD')}</div>
      </div>
    </div>
  );
}

export default DiaryCard;
