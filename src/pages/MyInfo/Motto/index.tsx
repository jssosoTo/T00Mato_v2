import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './index.module.css';

type ListProps = {
  id: string;
  title: string;
};

const ListItem = ({ id, title }: ListProps) => (
  <div className={styles.ListItem}>
    <div className={styles.ListItemTitle}>{title}</div>
    <div className={styles.ButtonContainer}>
      <button onClick={() => alert(id)}>
        <DeleteOutlined />
      </button>
    </div>
  </div>
);

function Motto() {
  const mockData = [
    {
      id: 'ss1ssWn1nW',
      title:
        '登峰造极无限冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲',
    },
    {
      id: 'ss1ssWn1nW',
      title:
        '登峰造极无限冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲',
    },
    {
      id: 'ss1ssWn1nW',
      title:
        '登峰造极无限冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲',
    },
    {
      id: 'ss1ssWn1nW',
      title:
        '登峰造极无限冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲',
    },
    {
      id: 'ss1ssWn1nW',
      title:
        '登峰造极无限冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲',
    },
    {
      id: 'ss1ssWn1nW',
      title:
        '登峰造极无限冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲',
    },
    {
      id: 'ss1ssWn1nW',
      title:
        '登峰造极无限冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲',
    },
    {
      id: 'ss1ssWn1nW',
      title:
        '登峰造极无限冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲',
    },
    {
      id: 'ss1ssWn1nW',
      title:
        '登峰造极无限冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲',
    },
    {
      id: 'ss1ssWn1nW',
      title:
        '登峰造极无限冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲',
    },
    {
      id: 'ss1ssWn1nW',
      title:
        '登峰造极无限冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲冲',
    },
  ];

  return (
    <section className={styles.MottoContainer}>
      <h2>
        <div>我的格言</div>
        <div className={styles.AddContainer}>
          <input />
          <button className="main-btn">
            <PlusOutlined />
          </button>
        </div>
      </h2>
      <div className={styles.MottoInputContainer}>
        {mockData.map((data: ListProps) => (
          <ListItem key={data.id} {...data} />
        ))}
      </div>
    </section>
  );
}

export default Motto;
