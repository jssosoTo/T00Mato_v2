/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from 'antd';
import { useEffect, useState } from 'react';

export default function useFetch(
  func: any,
  depends: string[],
  isRunning: boolean = true
) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await func();
      const data = await res.json();

      if (data.code !== 0) {
        throw new Error('请求有误，请重试！');
      }

      setData(data.data);
    } catch (err: any) {
      message.warning(err.message);
    } finally {
      setLoading(false);
    }
  };

  const run = async () => (func !== undefined ? fetchData() : null);

  useEffect(() => {
    func !== undefined && isRunning ? fetchData() : null;
  }, [...depends]);

  return { loading, data, run };
}
