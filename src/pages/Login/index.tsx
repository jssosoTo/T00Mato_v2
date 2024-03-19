import styles from './index.module.css';
import GoogleInput from '../../components/GoogleInput';
import { Button } from 'antd';
import { ChangeEvent, useState } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import useLoading from '../../../utils/useLoading';
import request from '../../../utils/request';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [info, setInfo] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });

  const { loading, run } = useLoading(async () => {
    await request.post(isRegister ? '/api/users' : '/api/auth/login', info);
  });

  const login = async () => {
    await run();
    document.cookie =
      'Authentication=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDA4NkBxcS5jb20iLCJ1c2VybmFtZSI6IjEwMDg2IiwiaWF0IjoxNzEwNzQ3MTkyLCJleHAiOjE3MTA4MzM1OTJ9.8jeMZPClHE5OntaA0yi70ZMIO45OgUF_Tyr2L1Nzw1c; Max-Age=2592000; Path=/; Expires=Wed, 17 Apr 2024 07:33:12 GMT; HttpOnly';
    navigate('/todo', { replace: true });
  };

  return (
    <div className={styles.LoginPage}>
      <div className={`${loading && styles.Loading} ${styles.LoginContainer}`}>
        <div className={styles.LogoContainer}>
          <h2>
            <span style={{ color: 'rgb(0, 148, 253)' }}>T</span>
            <span style={{ color: 'orangered' }}>0</span>
            <span style={{ color: 'yellow' }}>0</span>
            <span style={{ color: 'rgb(0, 148, 253)' }}>M</span>
            <span style={{ color: 'red' }}>a</span>
            <span style={{ color: 'greenyellow' }}>t</span>
            <span style={{ color: 'red' }}>o</span>
          </h2>
        </div>
        {step === 2 ? (
          <div className="flex-all-center">
            <div className={styles.BackContainer} onClick={() => setStep(1)}>
              <div className={styles.ColorImg}></div>
              <h4 style={{ fontWeight: 500 }}>{info.email}</h4>
              <div className={'flex-all-center'}>
                <EllipsisOutlined />
              </div>
            </div>
          </div>
        ) : (
          <h1>{isRegister ? '注册' : '登录'}</h1>
        )}

        <div className="flex-all-center mt-3">
          {step === 1 ? (
            <GoogleInput
              value={info.email}
              onChange={(e: ChangeEvent) =>
                setInfo({ ...info, email: e.target.value })
              }
              label="电子邮箱地址"
              style={{ width: '100%' }}
            />
          ) : isRegister ? (
            <GoogleInput
              label="密码"
              style={{ width: '100%' }}
              value={info.password}
              onChange={(e: ChangeEvent) =>
                setInfo({ ...info, password: e.target.value })
              }
            />
          ) : (
            <GoogleInput
              label="密码"
              style={{ width: '100%' }}
              value={info.password}
              onChange={(e: ChangeEvent) =>
                setInfo({ ...info, password: e.target.value })
              }
            />
          )}
        </div>
        <div>
          <Button type="link" className="p-0" style={{ fontSize: '1.4rem' }}>
            忘记了密码？
          </Button>
        </div>

        <div className="flex item-center justify-between mt-3">
          <Button
            type="link"
            className="p-0"
            style={step === 1 || isRegister ? {} : { visibility: 'hidden' }}
            onClick={() => {
              setStep(1);
              setIsRegister(!isRegister);
              setInfo({ email: '', password: '' });
            }}
          >
            {isRegister ? '已有账号？登录' : '创建账号'}
          </Button>
          <button
            className="main-btn"
            onClick={() =>
              step < 2 ? setStep((step: number) => step + 1) : login()
            }
          >
            {step < 2 ? '下一步' : isRegister ? '注册' : '登录'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
