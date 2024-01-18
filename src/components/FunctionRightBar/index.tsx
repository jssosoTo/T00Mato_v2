import { ReactNode } from 'react';
import styles from './index.module.css';
import { DeleteOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

function FunctionRightBar({
  isExtend,
  children,
  handleCloseRightFuncBar,
  deleteFunc,
  hideDelBtn,
}: {
  isExtend: boolean;
  children: ReactNode;
  handleCloseRightFuncBar: () => void;
  deleteFunc: () => void;
  hideDelBtn?: boolean;
}) {
  return (
    <div className={`${isExtend ? '' : styles.Close} ${styles.RightFuncBar}`}>
      <div className={styles.FuncBody}>{children}</div>

      <div style={{ marginTop: 'auto', padding: '0 2.4rem' }}>
        <div className={styles.BodyFuncs}>
          <div onClick={handleCloseRightFuncBar} title="隐藏右边侧边栏">
            <MenuUnfoldOutlined />
          </div>
          <div
            onClick={deleteFunc}
            title="删除数据"
            style={hideDelBtn ? { display: 'none' } : {}}
          >
            <DeleteOutlined />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FunctionRightBar;
