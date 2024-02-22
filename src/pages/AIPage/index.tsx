import Loading from '../../components/Loading';
import PageHeader from '../../components/PageHeader';
import {
  ChromeOutlined,
  LoadingOutlined,
  SendOutlined,
} from '@ant-design/icons';
import styles from './index.module.css';
import { Button, Input } from 'antd';
import queryAI from '../../../utils/queryAI';
import { ReactNode, useState } from 'react';

const { TextArea } = Input;

function AIPage() {
  const [message, setMessage] = useState<
    { role: 'user' | 'assistant'; content: string }[]
  >([]);
  const [AILoading, setAILoading] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');

  const ChatItem = ({
    role,
    content,
    icon,
  }: {
    role: string;
    content: string;
    icon?: ReactNode;
  }) => (
    <div className={role === 'assistant' ? styles.ChatLine : styles.UserLine}>
      <div className={styles.ChatSingleContainer}>
        <div className={styles.ChatImg}></div>
        <div className={styles.ChatContent}>
          {content.split('\n').map((p: string, idx: number) => (
            <div key={idx}>
              {p.replace(/\s/g, '&nbsp;').replace(/&nbsp;/g, ' ')}
            </div>
          ))}
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <Loading loading={false}>
      <PageHeader title="文心一言" icon={<ChromeOutlined />}>
        <div className={styles.ChatPage}>
          <div className={styles.ChatInfoContainer}>
            <div className={styles.Chat}>
              {message.length === 0 && (
                <ChatItem
                  role="assistant"
                  content="你好，我是文心一言❤️❤️❤️
作为你的智能伙伴，我既能写文案、想点子，又能陪你聊天、答疑解惑(文本处理模型，不支持生成图片)。"
                />
              )}
              {message.map(
                (item: { role: string; content: string }, idx: number) => (
                  <ChatItem key={idx} {...item} />
                )
              )}
              {AILoading && (
                <ChatItem
                  role="assistant"
                  content=""
                  icon={<LoadingOutlined />}
                />
              )}
            </div>
          </div>
          <div style={{ height: '15rem', position: 'relative' }}>
            <TextArea
              disabled={AILoading}
              style={{
                width: '100%',
                height: '100%',
                resize: 'none',
                fontSize: '2rem',
                paddingRight: '5rem',
              }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="可以通过进行回车换行, 点击右下角按钮发送你的问题"
            />
            <div>
              接口由百度{' '}
              <a href="https://cloud.baidu.com/product/wenxinworkshop?track=daohang">
                文心一言千帆大模型
              </a>{' '}
              提供
            </div>
            <Button
              loading={AILoading}
              className={styles.SendBtn}
              type="primary"
              onClick={() => {
                setAILoading(true);
                setMessage([...message, { role: 'user', content }]);
                queryAI([...message, { role: 'user', content }])
                  .then((data) => data.json())
                  .then((data) =>
                    setMessage((message) => [
                      ...message,
                      { role: 'assistant', content: data.result },
                    ])
                  )
                  .finally(() => {
                    setAILoading(false);
                    setContent('');
                  });
              }}
            >
              <SendOutlined />
            </Button>
          </div>
        </div>
      </PageHeader>
    </Loading>
  );
}

export default AIPage;
