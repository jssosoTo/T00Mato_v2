import {
  BulbFilled,
  BulbOutlined,
  MenuOutlined,
  QuestionOutlined,
  RightOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import styles from './TomatoNav.module.css';
import { useContext } from 'react';
import { AppContext } from '../Context/AppAPI/AppAPI';

function TomatoNav({ isExtendSideBar }: { isExtendSideBar: boolean }) {
  const { switchHeaderLeftBtn } = useContext(AppContext);

  return (
    <header className={`${styles.Header} flex item-center`}>
      <div className={`${styles.LogoContainer} flex item-center gap-3`}>
        <div
          className={`${styles.ExtendBtn} ${
            isExtendSideBar && 'rotate-180'
          } flex-all-center btn-hover`}
          onClick={switchHeaderLeftBtn}
        >
          {isExtendSideBar ? <RightOutlined /> : <MenuOutlined />}
        </div>
        <h1 className={`${styles.HeaderAppName}`}>T00Mato</h1>
      </div>
      <div className={`${styles.SearchContainer} flex-all-center`}>
        <div className={`${styles.SearchItem} flex item-center gap-1`}>
          <input placeholder="搜索" className={styles.Search} />
          <div className={styles.SearchBtn}>
            <SearchOutlined />
          </div>
        </div>
      </div>
      <ul className={`${styles.Settings} flex item-center gap-3`}>
        <li className="flex-all-center">
          <BulbOutlined />
          {/* <BulbFilled /> */}
        </li>
        <li className="flex-all-center">
          <QuestionOutlined />
        </li>
        <li className="flex-all-center">
          <div>
            <img
              src="https://www.bilibili.com/favicon.ico?v=1"
              alt="user photo"
            />
          </div>
        </li>
      </ul>
    </header>
  );
}

export default TomatoNav;
