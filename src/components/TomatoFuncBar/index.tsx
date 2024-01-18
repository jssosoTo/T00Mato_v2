import { useContext, useEffect, useState } from 'react';
import styles from './index.module.css';
import { Link, useLocation } from 'react-router-dom';
import {
  AppstoreAddOutlined,
  BarsOutlined,
  BookOutlined,
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
  const { handleCloseRightFuncBar, switchHeaderLeftBtn, todoClassId } =
    useContext(AppContext);
  const { pathname, search } = useLocation();

  const { data, run, loading } = useFetch(async () => {
    return request.get('/api/todo-group');
  }, []);

  const { loading: addLoading, run: addRun } = useLoading(async () =>
    request.post('/api/todo-group', { title })
  );

  console.log(search.slice(4));

  const ListItem = ({ id, title }: { id: string; title: string }) => (
    <li>
      <Link
        className={`${
          pathname === `/todo` && id === search.slice(4) ? styles.Active : ''
        } flex justify-between`}
        to={`/todo?id=${id}`}
        onClick={handleCloseRightFuncBar}
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
              onClick={handleCloseRightFuncBar}
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
              onClick={handleCloseRightFuncBar}
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
              onClick={handleCloseRightFuncBar}
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
              onClick={handleCloseRightFuncBar}
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
              onClick={handleCloseRightFuncBar}
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
                pathname === '/myInfo' ? styles.Active : ''
              } flex justify-between`}
              to="/myInfo"
              onClick={handleCloseRightFuncBar}
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
              <ul className={styles.ToDoClass}>
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
