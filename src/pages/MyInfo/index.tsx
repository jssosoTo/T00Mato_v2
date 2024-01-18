import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import Loading from '../../components/Loading';
import PageHeader from '../../components/PageHeader';
import styles from './index.module.css';
import Img from '../../assets/Home.jpg';
import TextArea from 'antd/es/input/TextArea';
import ThemeCard from './ThemeCard';

function MyInfo() {
  return (
    <Loading loading={false}>
      <PageHeader title="我的" icon={<UserOutlined />}>
        <main>
          <div className={styles.ProfileContainer}>
            <section className={styles.PictureContainer}>
              <h2>个人头像</h2>
              <div className={styles.ImgContainer}>
                <img src={Img} alt="我的头像" />
              </div>
              <div className="text-center">
                <button className={`main-btn ${styles.PictureBtn}`}>
                  更新头像
                </button>
              </div>
            </section>

            <section className={styles.MottoContainer}>
              <h2>
                <div>我的格言</div>{' '}
                <div>
                  <button className="main-btn">
                    <PlusOutlined />
                  </button>
                </div>
              </h2>
              <div className={styles.MottoInputContainer}>
                <TextArea style={{ height: '100%', resize: 'none' }} />
              </div>
            </section>
          </div>
          <div className={styles.PasswordChangeContainer}>
            <section className={styles.PasswordContainer}>
              <h2>修改密码</h2>
              <div className={styles.InfoInputContainer}>
                <input placeholder="请输入你的旧密码" />
                <input placeholder="请输入你的新密码" />
                <input placeholder="请确认你的新密码" />
              </div>
              <div className="text-center">
                <button className={`main-btn ${styles.PictureBtn}`}>
                  更新信息
                </button>
              </div>
            </section>
            <section className={styles.InfoContainer}>
              <h2>个人信息</h2>
              <div className={styles.InfoInputContainer}>
                <input placeholder="姓氏" />
                <input placeholder="名字" />
                <input placeholder="邮箱" />
              </div>
              <div className="text-center">
                <button className={`main-btn ${styles.PictureBtn}`}>
                  更新信息
                </button>
              </div>
            </section>
          </div>
          <ThemeCard />
        </main>
      </PageHeader>
    </Loading>
  );
}

export default MyInfo;
