import { useEffect, useState } from 'react';
import styles from './index.module.css';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../../../utils/useFetch';
import useLoading from '../../../../utils/useLoading';
import request from '../../../../utils/request';
import { Input, Popconfirm } from 'antd';
import {
  BookOutlined,
  DeleteOutlined,
  RollbackOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import Markdown from 'markdown-to-jsx';
import Loading from '../../../components/Loading';
import { weekdayChinese } from '../../../globalConfig';
import SimpleSegment from '../../../components/SimpleSegment';
import queryAI from './../../../../utils/queryAI';

enum SelectionEnum {
  all,
  preview,
  code,
}

const SelectionMap = {
  [SelectionEnum.all]: 'All',
  [SelectionEnum.preview]: 'Preview',
  [SelectionEnum.code]: 'Code',
};

function DetailDiary() {
  const { id } = useParams();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [previewStatus, setPreviewStatus] = useState<number>(SelectionEnum.all);
  const navigate = useNavigate();

  const isCreate = id ? false : true;

  const handleSubmit = async () => {
    if (isCreate)
      return request.post(`/api/notes/`, {
        content,
        title,
      });
    return request.put(`/api/notes/${id}`, {
      content,
      title,
    });
  };

  const {
    loading,
    data,
    run: reload,
  } = useFetch(
    !isCreate
      ? async () => {
          return request.get(`/api/notes/${id}`);
        }
      : undefined,
    []
  );

  const { loading: submitLoading, run } = useLoading(handleSubmit);
  const { loading: deleteLoading, run: deleteFunc } = useLoading(async () => {
    return request.delete(`/api/notes/${id}`);
  });

  useEffect(() => {
    setContent(data?.content || '');
    setTitle(data?.title || '');
  }, [data]);

  return (
    <Loading
      loading={loading || submitLoading || deleteLoading}
      style={{ overflow: 'auto', height: '100%', padding: '.3rem 0 1rem 0' }}
    >
      <div className="main-container-xs flex flex-column">
        <header className={`${styles.HeaderTitle}`}>
          <div className="flex justify-between item-center">
            <h2>
              <BookOutlined /> {isCreate ? '新建日记' : '修改日记'}
            </h2>
            <div className={styles.SortPosition}>
              <div
                className={`${styles.SortContainer} flex item-center gap-1`}
                onClick={() => navigate('/diary')}
              >
                <span>
                  <RollbackOutlined />
                </span>{' '}
                <span>返回</span>
              </div>
              <div
                className={`${styles.SortContainer} flex item-center gap-1`}
                onClick={async () => {
                  await run();
                  reload();
                }}
              >
                <span>
                  <SaveOutlined />
                </span>{' '}
                <span>保存</span>
              </div>
              {!isCreate && (
                <Popconfirm
                  placement="bottomLeft"
                  title="提醒"
                  description="你确定要删除该条日记吗？"
                  okText="确认"
                  cancelText="取消"
                  onConfirm={async () => {
                    await deleteFunc();
                    navigate('/diary');
                  }}
                >
                  <div
                    className={`${styles.SortContainer} flex item-center gap-1`}
                  >
                    <span>
                      <DeleteOutlined />
                    </span>{' '}
                    <span>删除</span>
                  </div>
                </Popconfirm>
              )}
            </div>
          </div>
          <p>
            {isCreate ? (
              <>本日记支持markdown格式</>
            ) : (
              <>
                最后修改于{' '}
                {moment(data?.['update_at']).format('YYYY年MM月DD日 HH:mm:ss')}{' '}
                星期
                {weekdayChinese[moment(data?.['update_at']).day()]}
              </>
            )}
          </p>
        </header>
        <main className="flex-1">
          <div className={styles.InitContainer}>
            <div className={styles.DiaryTitle}>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="请输入日记标题"
              />
            </div>

            <div className={styles.SegmentContainer}>
              <SimpleSegment
                selections={[
                  SelectionMap[SelectionEnum.all],
                  SelectionMap[SelectionEnum.preview],
                  SelectionMap[SelectionEnum.code],
                ]}
                onChange={setPreviewStatus}
              />
              <div className="flex item-center gap-3">
                <h4 style={{ fontSize: '1.2rem' }}>文言一心AI总结</h4>
                <div
                  className={styles.AIImg}
                  onClick={() =>
                    queryAI([
                      {
                        role: 'user',
                        content: `总结一下的markdown格式的日记20字以内： ${content}`,
                      },
                    ])
                  }
                >
                  <div className={styles.SliceBlue}></div>
                  <div className={styles.SliceRed}></div>
                </div>
              </div>
            </div>

            <div
              className={`${styles.TextDiary} ${
                previewStatus === SelectionEnum.all
                  ? styles.All
                  : previewStatus === SelectionEnum.preview
                  ? styles.Preview
                  : styles.Code
              }`}
            >
              <div className={styles.TextAreaContainer}>
                <Input.TextArea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  style={{ height: '100%', resize: 'none' }}
                  placeholder="原文本输入"
                ></Input.TextArea>
              </div>
              <div className={styles.MarkdownContainer}>
                {content.length === 0 && (
                  <span
                    style={{
                      display: 'inline-block',
                      color: 'lightgray',
                    }}
                  >
                    markdown展示
                  </span>
                )}
                {content.split('\n').map((p: string, idx: number) => (
                  <div>
                    <Markdown key={idx}>
                      {p.replace(/\s/g, '&nbsp;').replace(/&nbsp;/, ' ')}
                    </Markdown>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </Loading>
  );
}

export default DetailDiary;
