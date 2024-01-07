import { ReactNode, useContext } from 'react';
import styles from './index.module.css';
import { DeleteOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { AppContext } from '../Context/AppAPI/AppAPI';

function FunctionRightBar({
  isExtend,
  children,
  handleCloseRightFuncBar,
  deleteFunc,
}: {
  isExtend: boolean;
  children: ReactNode;
  handleCloseRightFuncBar: () => void;
  deleteFunc: () => void;
}) {
  return (
    <div className={`${isExtend ? '' : styles.Close} ${styles.RightFuncBar}`}>
      <div className={styles.FuncBody}>{children}</div>

      <div style={{ marginTop: 'auto', padding: '0 2.4rem' }}>
        <div className={styles.BodyFuncs}>
          <div onClick={handleCloseRightFuncBar} title="隐藏右边侧边栏">
            <MenuUnfoldOutlined />
          </div>
          <div onClick={deleteFunc} title="删除数据">
            <DeleteOutlined />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FunctionRightBar;
