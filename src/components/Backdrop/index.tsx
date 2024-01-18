import { LoadingOutlined } from '@ant-design/icons';
import ReactDOM from 'react-dom';
import styles from './index.module.css';

const spinning = document.getElementById('backdrop-root');

export default function Backdrop({ children }) {
  return ReactDOM.createPortal(
    <div className={styles.BackdropContainer}>{children}</div>,
    spinning!
  );
}
