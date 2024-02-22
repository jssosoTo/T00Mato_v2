import { useContext, useEffect, useState } from 'react';
import styles from './index.module.css';
import { Link, useLocation } from 'react-router-dom';
import {
  AppstoreAddOutlined,
  BarsOutlined,
  BookOutlined,
  ChromeOutlined,
  DownOutlined,
  HeatMapOutlined,
  HourglassOutlined,
  LoadingOutlined,
  MenuOutlined,
  PieChartOutlined,
  ScheduleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { AppContext } from '../Context/AppAPI/AppAPI';
import useFetch from '../../../utils/useFetch';
import request from '../../../utils/request';
import useLoading from '../../../utils/useLoading';
import { Spin } from 'antd';

function TomatoFuncBar({ isShow }: { isShow: boolean }) {
  const [title, setTitle] = useState<string>('');
  const [fold, setFold] = useState<boolean>(false);
  const { switchHeaderLeftBtn, todoClassId } = useContext(AppContext);
  const { pathname, search } = useLocation();

  const { data, run, loading } = useFetch(async () => {
    return request.get('/api/todo-group');
  }, []);

  const { loading: addLoading, run: addRun } = useLoading(async () =>
    request.post('/api/todo-group', { title })
  );

  const ListItem = ({ id, title }: { id: number; title: string }) => (
    <li>
      <Link
        className={`${
          pathname === `/todo` && String(id) === search.slice(4)
            ? styles.Active
            : ''
        } flex justify-between`}
        to={`/todo?id=${id}`}
      >
        <span>{title}</span>
        <span>
          <BarsOutlined />
        </span>
      </Link>
    </li>
  );

  useEffect(() => {
    run();
  }, [todoClassId]);

  return (
    <aside className={`${styles.Aside} transition_3s ${!isShow && 'w-0'}`}>
      <h2 className={`${styles.SidebarTitle} flex item-center`}>
        <div
          className="main-container-s"
          style={{ color: 'var(--main-color)', fontSize: '2.4rem' }}
        >
          T00Mato
        </div>
      </h2>
      <div className={styles.ListContainer}>
        <ul className={`${styles.TodoList}`}>
          <li>
            <Link
              className={`${
                pathname === '/todo' && search.length === 0 ? styles.Active : ''
              } flex justify-between`}
              to="/todo"
            >
              <span>待办</span>{' '}
              <span>
                <ScheduleOutlined />
              </span>
            </Link>
          </li>
          <li>
            <Link
              className={`${
                pathname === '/futureTime' ? styles.Active : ''
              } flex justify-between`}
              to="/futureTime"
            >
              <span>未来时间轴</span>
              <span>
                <HourglassOutlined />
              </span>
            </Link>
          </li>
          <li>
            <Link
              className={`${
                pathname === '/data' ? styles.Active : ''
              } flex justify-between`}
              to="/data"
            >
              <span>数据统计</span>
              <span>
                <PieChartOutlined />
              </span>
            </Link>
          </li>
          <li>
            <Link
              className={`${
                pathname === '/focus' ? styles.Active : ''
              } flex justify-between`}
              to="/focus"
            >
              <span>专注模式</span>
              <span>
                <HeatMapOutlined />
              </span>
            </Link>
          </li>
          <li>
            <Link
              className={`${
                pathname.startsWith('/diary') ? styles.Active : ''
              } flex justify-between`}
              to="/diary"
            >
              <span>日记</span>
              <span>
                <BookOutlined />
              </span>
            </Link>
          </li>
          <li>
            <Link
              className={`${
                pathname === '/baiduAI' ? styles.Active : ''
              } flex justify-between`}
              to="/baiduAI"
            >
              <span>文心一言AI助手</span>{' '}
              <span>
                <ChromeOutlined />
              </span>
            </Link>
          </li>
          <li>
            <Link
              className={`${
                pathname === '/myInfo' ? styles.Active : ''
              } flex justify-between`}
              to="/myInfo"
            >
              <span>我的</span>{' '}
              <span>
                <UserOutlined />
              </span>
            </Link>
          </li>
        </ul>
        <div className={styles.Divide}>
          <div></div>
        </div>
        <div className={styles.ToDoListContainer}>
          <div className={styles.ToDoClassContainer}>
            <Spin spinning={loading}>
              <div className={styles.ToDoAddContainer}>
                <div>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="新建待办集"
                  />
                </div>
                <div
                  className={`${styles.addBtnContainer}`}
                  onClick={() => setFold(!fold)}
                >
                  <DownOutlined
                    style={{
                      transition: 'all .3s',
                      ...(fold && { rotate: '180deg' }),
                    }}
                  />
                </div>
                <div
                  className={`${styles.addBtnContainer} ${
                    addLoading ? styles.Forbidden : ''
                  }`}
                  onClick={
                    addLoading
                      ? () => {}
                      : async () => {
                          await addRun();
                          setTitle('');
                          run();
                        }
                  }
                >
                  {addLoading ? <LoadingOutlined /> : <AppstoreAddOutlined />}
                </div>
              </div>
              <ul className={`${styles.ToDoClass} ${fold && styles.Hide}`}>
                {data.map((item: { id: string; title: string }) => (
                  <ListItem key={item.id} {...item} />
                ))}
              </ul>
            </Spin>
          </div>
        </div>
      </div>
      <div
        className={`${styles.ExtendBtn} ${
          isShow ? '' : styles.Active
        } flex-all-center btn-hover`}
        onClick={switchHeaderLeftBtn}
      >
        <MenuOutlined />
      </div>
    </aside>
  );
}

export default TomatoFuncBar;
