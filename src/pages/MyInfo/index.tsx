import { UserOutlined } from '@ant-design/icons';
import Loading from '../../components/Loading';
import PageHeader from '../../components/PageHeader';
import styles from './index.module.css';
import Img from '../../assets/Home.jpg';
import ThemeCard from './ThemeCard';
import Motto from './Motto';
import { useState } from 'react';
import { Watermark } from 'antd';

function MyInfo() {
  const [isInfoSet, setIsInfoSet] = useState<boolean>(false);

  return (
    <Loading loading={false}>
      <PageHeader title="我的" icon={<UserOutlined />}>
        <main>
          <Watermark content={[' P0PC0RN', 'T00Mato']}>
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

              <Motto />
            </div>
            <div className={styles.PasswordChangeContainer}>
              <section className={styles.InfoContainer}>
                <h2 className={styles.InfoTitleContainer}>
                  <div>个人信息</div>
                  <div>
                    <button
                      className="secondary-btn"
                      hidden={!isInfoSet}
                      onClick={() => setIsInfoSet(false)}
                    >
                      取消
                    </button>
                    {isInfoSet ? (
                      <button
                        className="main-btn ml-1"
                        onClick={() => setIsInfoSet(false)}
                      >
                        修改
                      </button>
                    ) : (
                      <button
                        className="main-btn ml-1"
                        onClick={() => setIsInfoSet(true)}
                      >
                        编辑
                      </button>
                    )}
                  </div>
                </h2>
                <div className={styles.InfoInputContainer}>
                  <div className={styles.InfoListItem}>
                    <label>邮箱：</label>
                    {isInfoSet ? <input /> : <h4>p0pc0rnsuzz@gmail.com</h4>}
                  </div>
                  <div className={styles.InfoListItem}>
                    <label>姓氏：</label>
                    {isInfoSet ? <input /> : <h4>Su</h4>}
                  </div>
                  <div className={styles.InfoListItem}>
                    <label>名字：</label>
                    {isInfoSet ? <input /> : <h4>P0PC0RN</h4>}
                  </div>
                  <div className={styles.InfoListItem}>
                    <label>性别：</label>
                    {isInfoSet ? <input /> : <h4>男</h4>}
                  </div>
                  <div className={styles.InfoListItem}>
                    <label>介绍：</label>
                    {isInfoSet ? (
                      <input />
                    ) : (
                      <h4>木叶飞舞之处，火亦生生不息</h4>
                    )}
                  </div>
                </div>
              </section>
            </div>
            <ThemeCard />
          </Watermark>
        </main>
      </PageHeader>
    </Loading>
  );
}

export default MyInfo;
