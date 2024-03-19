/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useFetch(
  func: any,
  depends: string[],
  isRunning: boolean = true
) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await func();
      console.log(res);
      const data = res.data;

      if (data.code !== 0) {
        throw new Error('请求有误，请重试！');
      }

      setData(data.data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        Modal.confirm({
          title: '暂未登录，是否跳转进行登录？',
          onOk: () => navigate('/login', { replace: true }),
        });
      }

      message.warning(err.message);
    } finally {
      setLoading(false);
    }
  };

  const run = async () => (func !== undefined ? fetchData() : null);

  useEffect(() => {
    setData([]);
    func !== undefined && isRunning ? fetchData() : null;
  }, [...depends]);

  return { loading, data, run };
}
