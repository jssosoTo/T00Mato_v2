import { UserOutlined } from '@ant-design/icons';
import Loading from '../../components/Loading';
import PageHeader from '../../components/PageHeader';
import styles from './index.module.css';
import Img from '../../assets/Home.jpg';
import ThemeCard from './ThemeCard';
import Motto from './Motto';
import { ChangeEventHandler, useEffect, useState } from 'react';
import { Watermark } from 'antd';
import useFetch from '../../../utils/useFetch';
import request from '../../../utils/request';
import useLoading from '../../../utils/useLoading';

const initialState = {
  email: '',
  username: '',
  sex: '',
  bio: '',
};

function MyInfo() {
  const [isInfoSet, setIsInfoSet] = useState<boolean>(false);
  const [info, setInfo] = useState<{
    id?: string;
    email: string;
    username: string;
    sex: string;
    bio: string;
  }>(initialState);

  function changeInfo(e: ChangeEventHandler) {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  }

  const {
    data = {},
    loading,
    run,
  } = useFetch(async () => {
    return await request.get('/api/users/profile');
  }, []);

  const { loading: editLoading, run: editRun } = useLoading(async () => {
    const res = await request.put(`api/users/${data.id}`, {
      ...info,
    });

    run();
    return res;
  });

  useEffect(() => {
    const { id, ...formatData } = data || {};
    setInfo({ ...initialState, ...formatData });
  }, [data]);

  return (
    <Loading loading={loading || editLoading}>
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
                        onClick={async () => {
                          await editRun();
                          setIsInfoSet(false);
                        }}
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
                    {isInfoSet ? (
                      <input
                        id="email"
                        name="email"
                        value={info.email}
                        onChange={changeInfo}
                      />
                    ) : (
                      <h4>{data?.email || '-'}</h4>
                    )}
                  </div>
                  <div className={styles.InfoListItem}>
                    <label>姓名：</label>
                    {isInfoSet ? (
                      <input
                        id="username"
                        name="username"
                        value={info.username}
                        onChange={changeInfo}
                      />
                    ) : (
                      <h4>{data?.username || '暂未填写'}</h4>
                    )}
                  </div>
                  <div className={styles.InfoListItem}>
                    <label>性别：</label>
                    {isInfoSet ? (
                      <input
                        id="sex"
                        name="sex"
                        value={info.sex}
                        onChange={changeInfo}
                      />
                    ) : (
                      <h4>
                        {data?.sex === 0
                          ? '男'
                          : data?.sex === 1
                          ? '女'
                          : '未知'}
                      </h4>
                    )}
                  </div>
                  <div className={styles.InfoListItem}>
                    <label>介绍：</label>
                    {isInfoSet ? (
                      <input
                        id="bio"
                        name="bio"
                        value={info.bio}
                        onChange={changeInfo}
                      />
                    ) : (
                      <h4>{data?.bio || '这家伙很懒，什么都没有留下...'}</h4>
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
