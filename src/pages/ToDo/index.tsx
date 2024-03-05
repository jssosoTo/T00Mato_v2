import {
  ClockCircleOutlined,
  DeleteOutlined,
  DownOutlined,
  FieldTimeOutlined,
  FireOutlined,
  PlusOutlined,
  RedoOutlined,
  ReloadOutlined,
  RestOutlined,
  RetweetOutlined,
  ScheduleOutlined,
  TagOutlined,
  UpOutlined,
} from '@ant-design/icons';
import styles from './index.module.css';
import { useContext, useEffect, useState } from 'react';
import Icon from '@ant-design/icons/lib/components/Icon';
import ToDoItem from '../../components/ToDoItem';
import FunctionRightBar from '../../components/FunctionRightBar';
import {
  Checkbox,
  Col,
  Empty,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Slider,
} from 'antd';
import Loading from '../../components/Loading';
import PageHeader from '../../components/PageHeader';
import useLoading from '../../../utils/useLoading';
import request from '../../../utils/request';
import useFetch from '../../../utils/useFetch';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../components/Context/AppAPI/AppAPI';

const SortSvg = () => (
  <svg
    t="1704177192620"
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="1456"
    width="18"
    height="18"
  >
    <path
      d="M673.158095 252.830476v634.026667h-71.923809V172.251429c0-10.142476 4.022857-19.846095 11.215238-26.989715a38.546286 38.546286 0 0 1 54.296381 0L926.47619 403.553524l-50.883047 50.566095-202.435048-201.289143zM350.841905 768.121905V134.095238h71.923809v719.823238l-0.902095 6.460953c-1.26781 8.045714-2.56 9.728-9.703619 18.992761l-8.045714 4.388572c-17.92 9.45981-20.577524 7.996952-43.154286-4.388572L97.52381 617.374476l50.883047-50.541714 202.435048 201.264762z"
      p-id="1457"
    ></path>
  </svg>
);

type ModalProps = {
  id: string;
  title: string;
  detail: string;
  repeat: number | undefined;
  repeat_date: string;
  repeat_type: string;
  fail_repeat: number;
  rest_time: number;
  focus_time: number;
  total_time: number;
  success_repeat: number;
  create_at: string | undefined;
  update_at: string | undefined;
  todo_group: string[];
};

const initialState = {
  show: false,
  id: '',
  title: '',
  detail: '',
  repeat: undefined,
  repeat_date: '',
  repeat_type: 'once',
  fail_repeat: 0,
  success_repeat: 0,
  rest_time: 10,
  focus_time: 25,
  total_time: 0,
  create_at: undefined,
  update_at: undefined,
  todo_group: [],
};

function ToDo() {
  const { deleteTodoClass } = useContext(AppContext);
  const [form] = Form.useForm();
  const [sortModalShow, setSortModalShow] = useState({
    show: false,
    sortWay: 0,
    title: '排序依据',
  });
  const sortArr = [
    {
      name: '创建时间（最新最前）',
      icon: <UpOutlined />,
      onClick: () => setSortModalShow({ ...sortModalShow, sortWay: 0 }),
      sort: (a: ModalProps, b: ModalProps) =>
        moment(b['create_at']).valueOf() - moment(a['create_at']).valueOf(),
    },
    {
      name: '创建时间（最新最前）',
      icon: <DownOutlined />,
      onClick: () => setSortModalShow({ ...sortModalShow, sortWay: 1 }),
      sort: (a: ModalProps, b: ModalProps) =>
        moment(a['create_at']).valueOf() - moment(b['create_at']).valueOf(),
    },
    {
      name: '番茄钟时长（升序）',
      icon: <ClockCircleOutlined />,
      onClick: () => setSortModalShow({ ...sortModalShow, sortWay: 2 }),
      sort: (a: ModalProps, b: ModalProps) =>
        moment(a['focus_time']).valueOf() - moment(b['focus_time']).valueOf(),
    },
    {
      name: '番茄钟时长（降序）',
      icon: <ClockCircleOutlined />,
      onClick: () => setSortModalShow({ ...sortModalShow, sortWay: 3 }),
      sort: (a: ModalProps, b: ModalProps) =>
        moment(b['focus_time']).valueOf() - moment(a['focus_time']).valueOf(),
    },
  ];
  const [modal, setModal] = useState<ModalProps & { show: boolean }>(
    initialState
  );
  const navigate = useNavigate();
  const { search } = useLocation();
  const id = search.split('=')[1];

  const closeSortModal = () =>
    setSortModalShow((oldModalShow) => ({ ...oldModalShow, show: false }));

  const { loading, run, data } = useFetch(
    async () => {
      return request.get('/api/todo?page_size=100');
    },
    [id],
    !id
  );

  const {
    loading: todoClassLoading,
    data: classData,
    run: todoClassRun,
  } = useFetch(async () => request.get(`/api/todo-group/${id}`), [id], !!id);

  const { loading: groupLoading, data: groupData } = useFetch(
    async () => request.get('api/todo-group'),
    [id],
    true
  );

  const { loading: addLoading, run: addRun } = useLoading(async () => {
    const formData = form.getFieldsValue();
    const {
      title,
      repeat,
      repeat_type,
      repeat_date,
      todo_group: todo_group_id,
    } = formData;

    if (!title || !repeat) {
      throw new Error('请输入标题和重复次数');
    }
    const { id } = modal;
    return id
      ? request.put(
          `/api/todo/${modal.id}`,
          repeat_type
            ? {
                ...formData,
                repeat_date:
                  (repeat_date &&
                    repeat_date
                      .split('')
                      .sort((a: number, b: number) => a - b)
                      .join('')) ||
                  '',
                todo_group_id: Number(todo_group_id),
                todo_group: undefined,
              }
            : formData
        )
      : request.post(`/api/todo/${id}`, {
          ...formData,
          todo_group_id: Number(todo_group_id),
          todo_group: undefined,
          repeat_date:
            (repeat_date &&
              repeat_date
                .split('')
                .sort((a: number, b: number) => a - b)
                .join('')) ||
            '',
        });
  });

  const { loading: deleteLoading, run: deleteRun } = useLoading(async () => {
    return request.delete(`/api/todo/${modal.id}`);
  });

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
                placeholder="请输入你的待办主题"
                showCount
                autoSize
                maxLength={50}
              />
            </Form.Item>
          </header>
          <main className={styles.MainBarFuncs}>
            <div hidden={!!id}>
              <h4>
                关联待办集合 <TagOutlined />
              </h4>
              <Form.Item noStyle name="todo_group">
                <Select
                  allowClear
                  loading={groupLoading}
                  placeholder="请选择你的关联集，以作归类"
                  options={
                    groupData?.map(
                      ({
                        id: value,
                        title: label,
                      }: {
                        id: number;
                        title: string;
                      }) => ({ label, value })
                    ) || []
                  }
                  style={{
                    width: '100%',
                    minHeight: '4rem',
                  }}
                />
              </Form.Item>
            </div>
            <div>
              <h4>
                番茄钟完成循环次数 <RedoOutlined />
              </h4>
              <Form.Item noStyle name="repeat">
                <InputNumber
                  controls={false}
                  min={1}
                  max={100}
                  placeholder="每日番茄钟循环次数"
                  className="flex item-center"
                  style={{
                    width: '100%',
                    height: '4rem',
                    padding: 0,
                  }}
                />
              </Form.Item>
            </div>
            <div>
              <h4>
                一个番茄钟专注时长 <FireOutlined />
              </h4>
              <div
                className="flex justify-center item-center"
                style={{
                  height: '4rem',
                  backgroundColor: 'var(--list-bg-main-color)',
                  borderRadius: '8px',
                  marginTop: '1rem',
                }}
              >
                <Form.Item noStyle name="focus_time">
                  <Slider
                    style={modal.show ? { width: '90%' } : { display: 'none' }}
                    min={1}
                    max={180}
                  />
                </Form.Item>
              </div>
            </div>
            <div>
              <h4>
                一个番茄钟休息时长 <RestOutlined />
              </h4>
              <div
                className="flex justify-center item-center"
                style={{
                  height: '4rem',
                  backgroundColor: 'var(--list-bg-main-color)',
                  borderRadius: '8px',
                  marginTop: '1rem',
                }}
              >
                <Form.Item noStyle name="rest_time">
                  <Slider
                    style={modal.show ? { width: '90%' } : { display: 'none' }}
                    min={1}
                    max={180}
                  />
                </Form.Item>
              </div>
            </div>
            <div>
              <h4>
                待办重复周期 <RetweetOutlined />
              </h4>
              <Form.Item noStyle name="repeat_type">
                <Radio.Group>
                  <Radio.Button value="once">单次</Radio.Button>
                  <Radio.Button value="loop">循环</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item noStyle dependencies={['repeat_type']}>
                {({ getFieldValue }) => {
                  const isLoop = getFieldValue('repeat_type') === 'loop';

                  return isLoop ? (
                    <Form.Item noStyle name="repeat_date">
                      <Checkbox.Group>
                        <Row>
                          <Col span={6}>
                            <Checkbox value="1">周一</Checkbox>
                          </Col>
                          <Col span={6}>
                            <Checkbox value="2">周二</Checkbox>
                          </Col>
                          <Col span={6}>
                            <Checkbox value="3">周三</Checkbox>
                          </Col>
                          <Col span={6}>
                            <Checkbox value="4">周四</Checkbox>
                          </Col>
                          <Col span={6}>
                            <Checkbox value="5">周五</Checkbox>
                          </Col>
                          <Col span={6}>
                            <Checkbox value="6">周六</Checkbox>
                          </Col>
                          <Col span={6}>
                            <Checkbox value="7">周日</Checkbox>
                          </Col>
                        </Row>
                      </Checkbox.Group>
                    </Form.Item>
                  ) : null;
                }}
              </Form.Item>
            </div>
          </main>
          <div className={styles.ButtonContainer}>
            <button
              onClick={async () => {
                await addRun();
                id ? await todoClassRun() : await run();
                setModal({ ...initialState });
              }}
            >
              {modal.id ? '修改' : '添加'}
            </button>
          </div>
        </div>
      </Form>
    </FunctionRightBar>
  );

  useEffect(() => {
    document.addEventListener('click', closeSortModal);

    return () => removeEventListener('click', closeSortModal);
  }, []);

  useEffect(() => {
    form.setFieldsValue(modal);
  }, [modal, form]);

  useEffect(() => {
    setModal({ ...initialState });
  }, [id]);

  return (
    <Loading
      loading={addLoading || deleteLoading || loading || todoClassLoading}
      extendNode={ExtendNode}
    >
      <PageHeader
        title={id ? `待办集：${classData?.title || '(无标题)'}` : '待办'}
        icon={<ScheduleOutlined />}
        sortModalShow={sortModalShow}
        needTime
        funcs={[
          {
            name: '刷新',
            icon: <ReloadOutlined />,
            onClick: run,
          },
          ...(id
            ? [
                {
                  name: '删除',
                  icon: <DeleteOutlined />,
                  confirm: {
                    title: '温馨提醒',
                    description: '你确认删除吗？',
                    okText: '确认',
                    cancelText: '取消',
                    onConfirm: async () => {
                      await request.delete(`/api/todo-group/${id}`);
                      deleteTodoClass?.(id);
                      navigate('/todo', { replace: true });
                    },
                  },
                },
              ]
            : []),
          {
            name: '新增',
            icon: <PlusOutlined />,
            onClick: () => setModal({ ...initialState, show: true }),
          },
          {
            name: '排序',
            icon: <Icon component={SortSvg} />,
            onClick: (e) => {
              e.stopPropagation();
              setSortModalShow({ ...sortModalShow, show: true });
            },
          },
        ]}
        sortArr={sortArr}
      >
        <main className={`auto-scroll ${styles.Main}`}>
          {((id ? classData.todos : data.list) || [])
            .slice()
            .sort(sortArr[sortModalShow.sortWay].sort)
            .map((item: ModalProps) => (
              <ToDoItem
                key={item.id}
                {...item}
                onClick={setModal}
                src={`/focus?id=${item.id}`}
              />
            ))}
          {!((id ? classData.todos : data.list) || []).length && (
            <Empty
              className="m-auto"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={'还没添加待办，快速添加吧~~'}
            />
          )}
        </main>
      </PageHeader>
    </Loading>
  );
}

export default ToDo;
