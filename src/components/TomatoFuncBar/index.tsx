import React, { useContext } from 'react';
import styles from './index.module.css';
import { Link, useLocation } from 'react-router-dom';
import {
  BookOutlined,
  HeatMapOutlined,
  HourglassOutlined,
  PieChartOutlined,
  ScheduleOutlined,
} from '@ant-design/icons';
import { AppContext } from '../Context/AppAPI/AppAPI';

function TomatoFuncBar({ isShow }: { isShow: boolean }) {
  const { handleCloseRightFuncBar } = useContext(AppContext);
  const { pathname } = useLocation();

  return (
    <aside className={`${styles.Aside} transition_3s ${!isShow && 'w-0'}`}>
      <h2 className={`${styles.SidebarTitle} flex-all-center`}>
        <div className="main-container-s">功能总览</div>
      </h2>
      <ul className={`${styles.TodoList}`}>
        <li>
          <Link
            className={`${
              pathname === '/todo' ? styles.Active : ''
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
      </ul>
    </aside>
  );
}

export default TomatoFuncBar;
