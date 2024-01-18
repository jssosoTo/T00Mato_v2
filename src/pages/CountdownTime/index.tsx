import styles from './index.module.css';
import PageHeader from '../../components/PageHeader';
import {
  AppstoreOutlined,
  CalendarOutlined,
  HourglassOutlined,
  LayoutOutlined,
  PlusOutlined,
  TagOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import Loading from '../../components/Loading';
import useFetch from '../../../utils/useFetch';
import request from '../../../utils/request';
import { useEffect, useState } from 'react';
import FunctionRightBar from '../../components/FunctionRightBar';
import dateFormatToChinese from '../../../utils/dateFormatToChinese';
import moment from 'moment';
import { DatePicker, Form, Input, TreeSelect } from 'antd';
import useLoading from '../../../utils/useLoading';
import dayjs from 'dayjs';

type TimeProps = {
  id: string;
  end_time: string;
  title: string;
  connections: string[];
};

type ModalProps = {
  show: boolean;
  id: string;
  title: string;
  end_time: string;
  connections: string[];
};

const initialState = {
  show: false,
  id: '',
  title: '',
  end_time: '',
  connections: [],
};

function CountdownTime() {
  const [form] = Form.useForm();
  const [sortModalShow, setSortModalShow] = useState({
    show: false,
    sortWay: 0,
    title: '布局设置',
  });
  const [modal, setModal] = useState<ModalProps>(initialState);

  const closeSortModal = () =>
    setSortModalShow((oldModalShow) => ({ ...oldModalShow, show: false }));

  const { loading, run, data } = useFetch(async () => {
    return request.get('/api/time');
  }, []);

  const { loading: addLoading, run: addRun } = useLoading(async () => {
    const { title, end_time } = form.getFieldsValue();

    if (!title || !end_time) {
      throw new Error('请输入标题和截至时间');
    }
    const formData = form.getFieldsValue();
    const { id } = modal;
    return id
      ? request.patch('/api/time', {
          ...formData,
          end_time: formData.end_time.startOf('d').valueOf(),
        })
      : request.post(`/api/time/${id}`, {
          ...formData,
          end_time: formData.end_time.startOf('d').valueOf(),
        });
  });

  const { loading: deleteLoading, run: deleteRun } = useLoading(async () => {
    return request.delete(`/api/time/${modal.id}`);
  });

  useEffect(() => {
    document.addEventListener('click', closeSortModal);

    return () => removeEventListener('click', closeSortModal);
  }, []);

  const ExtendNode = (
    <FunctionRightBar
      isExtend={modal.show}
      handleCloseRightFuncBar={() => setModal({ ...initialState })}
      hideDelBtn={!modal.id}
      deleteFunc={async () => {
        await deleteRun();
        await run();
        setModal({ ...initialState });
      }}
    >
      <Form form={form}>
        <div className={styles.ModalContainer}>
          <header>
            <Form.Item noStyle name="title">
              <Input.TextArea
                placeholder="请输入你的目标标题"
                showCount
                autoSize
                maxLength={50}
              />
            </Form.Item>
          </header>
          <main className={styles.MainBarFuncs}>
            <div>
              <h4>
                关联待办 <TagOutlined />
              </h4>
              <Form.Item noStyle name="connections">
                <TreeSelect
                  placeholder="请选择你的关联待办，以在专注中显示"
                  style={{
                    width: '100%',
                    height: '4rem',
                  }}
                />
              </Form.Item>
            </div>
            <div>
              <h4>
                截止时间 <CalendarOutlined />
              </h4>
              <Form.Item noStyle name="end_time">
                <DatePicker
                  placeholder="请输入你的目标截至时间"
                  style={{
                    width: '100%',
                    height: '4rem',
                  }}
                />
              </Form.Item>
            </div>
            <div className={styles.ButtonContainer}>
              <button
                onClick={async () => {
                  await addRun();
                  await run();
                  setModal({ ...initialState });
                }}
              >
                {modal.id ? '修改' : '添加'}
              </button>
            </div>
          </main>
        </div>
      </Form>
    </FunctionRightBar>
  );

  useEffect(() => {
    form.setFieldsValue({
      ...modal,
      end_time: modal.end_time ? dayjs(modal.end_time) : undefined,
    });
  }, [modal, form]);

  return (
    <Loading
      loading={loading || addLoading || deleteLoading}
      extendNode={ExtendNode}
    >
      <PageHeader
        title="未来时间轴"
        sortModalShow={sortModalShow}
        funcs={[
          {
            name: '新增',
            icon: <PlusOutlined />,
            onClick: () => setModal({ ...initialState, show: true }),
          },
          {
            name: '布局',
            icon: <LayoutOutlined />,
            onClick: (e) => {
              e.stopPropagation();
              setSortModalShow({ ...sortModalShow, show: true });
            },
          },
        ]}
        sortArr={[
          {
            name: '卡片布局',
            icon: <AppstoreOutlined />,
            onClick: () => setSortModalShow({ ...sortModalShow, sortWay: 0 }),
          },
          {
            name: '列表布局',
            icon: <UnorderedListOutlined />,
            onClick: () => setSortModalShow({ ...sortModalShow, sortWay: 1 }),
          },
        ]}
        icon={<HourglassOutlined />}
        needTime
      >
        <main className={`auto-scroll`}>
          <div
            className={
              sortModalShow.sortWay === 0
                ? styles.TargetContainer
                : styles.TargetListContainer
            }
          >
            {data.map((item: TimeProps) => {
              const dateText = dateFormatToChinese(
                moment(item.end_time).fromNow()
              ).split(' ');

              return (
                <div
                  key={item.id}
                  className={styles.TimeCard}
                  onClick={() => setModal({ ...item, show: true })}
                >
                  <div className={styles.CardTitleHeader}>
                    <h2>{item.title}</h2>
                  </div>
                  <div className={styles.CardMain}>
                    <h6>
                      {dateText[0]} <span>{dateText[1]}</span> {dateText[2]}
                    </h6>
                  </div>
                  <div className={styles.CardFooter}>
                    目标时间：{moment(item.end_time).format('YYYY-MM-DD')}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </PageHeader>
    </Loading>
  );
}

export default CountdownTime;
