/* eslint-disable @typescript-eslint/no-explicit-any */
import { message } from 'antd';
import { useEffect, useState } from 'react';

export default function useFetch(func: any, depends: string[]) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await func();
      console.log(res);
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

  useEffect(() => {
    func !== undefined ? fetchData() : null;
  }, [...depends]);

  return { loading, data };
}
