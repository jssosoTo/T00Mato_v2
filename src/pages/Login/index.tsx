import styles from './index.module.css';
import GoogleInput from '../../components/GoogleInput';
import { Button } from 'antd';
import { ChangeEvent, useState } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';

function Login() {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>('');

  return (
    <div className={styles.LoginPage}>
      <div className={`${false && styles.Loading} ${styles.LoginContainer}`}>
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
              <h4 style={{ fontWeight: 500 }}>{email}</h4>
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
              value={email}
              onChange={(e: ChangeEvent) => setEmail(e.target.value)}
              label="电子邮箱地址"
              style={{ width: '100%' }}
            />
          ) : (
            <GoogleInput label="邮箱验证码" style={{ width: '100%' }} />
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
            }}
          >
            {isRegister ? '已有账号？登录' : '创建账号'}
          </Button>
          {step !== 3 && (
            <button
              className="main-btn"
              onClick={() => setStep((step: number) => step + 1)}
            >
              下一步
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
