import { useEffect, useState } from 'react';
import styles from './index.module.css';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../../../../utils/useFetch';
import useLoading from '../../../../utils/useLoading';
import request from '../../../../utils/request';
import { Popconfirm, Spin } from 'antd';
import { DeleteOutlined, SaveOutlined } from '@ant-design/icons';

function DetailDiary() {
  const { id } = useParams();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
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

  const { loading, data } = useFetch(
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
    setContent(data?.content);
    setTitle(data?.title);
  }, [data]);

  return (
    <div
      className="flex-1 flex justify-center item-center"
      style={{ overflow: 'auto', height: '100%', padding: '1.2rem 0' }}
    >
      <div className={`${styles.Book} main-container-xs`}>
        <Spin spinning={loading || submitLoading || deleteLoading}>
          <div className="flex flex-column">
            <h6 className={styles.currentTime}>
              {isCreate ? (
                <>新建日记</>
              ) : (
                <>
                  最后修改于{' '}
                  {moment(data?.['update_at']).format(
                    'YYYY 年 M 月 D 日 HH:mm'
                  )}
                </>
              )}
              <div className={styles.FuncContainer}>
                <div className={styles.SvgBtn} onClick={run}>
                  <span>
                    <SaveOutlined />
                  </span>
                  <span className={styles.SvgText}>保存</span>
                </div>
                {!isCreate && (
                  <Popconfirm
                    placement="topLeft"
                    title="提醒"
                    description="你确定要删除该条日记吗？"
                    okText="确认"
                    cancelText="取消"
                    onConfirm={async () => {
                      await deleteFunc();
                      navigate('/diary');
                    }}
                  >
                    <div className={styles.SvgBtn}>
                      <span>
                        <DeleteOutlined />
                      </span>
                      <span className={styles.SvgText}>删除</span>
                    </div>
                  </Popconfirm>
                )}
              </div>
            </h6>
            <div className={styles.DiaryTitle}>
              <h4>日记标题</h4>
              <input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className={styles.TextAreaContainer}>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
          </div>
        </Spin>
      </div>
    </div>
  );
}

export default DetailDiary;
