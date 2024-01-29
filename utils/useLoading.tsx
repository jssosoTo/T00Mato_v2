/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from 'antd';
import { useState } from 'react';

export default function useLoading(func: any) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async (...args: any) => {
    setLoading(true);
    try {
      const res = await func(...(args || []));
      const data = res.data;

      if (data.code !== 0) {
        throw new Error('请求有误，请重试！');
      }

      setData(data.data);

      return data.data;
    } catch (err: any) {
      message.warning(err.message);
    } finally {
      setLoading(false);
    }
  };

  const run = async (args?: any) =>
    func !== undefined ? await fetchData(args) : null;

  return { loading, data, run };
}
