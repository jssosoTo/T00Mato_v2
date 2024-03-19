/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const RemoteAPI = axios.create({
  baseURL: 'https://bored-woolens-fly.cyclic.app',
  headers: {
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': 'no-cors',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDA4NkBxcS5jb20iLCJ1c2VybmFtZSI6IjEwMDg2IiwiaWF0IjoxNzEwNzQ5Njg5LCJleHAiOjE3MTA4MzYwODl9.4g-a6ZNkvm5CUlUtOheUm9Ac_tIrUkTUST7gGGx4Qfg',
    // 'Access-Control-Allow-Origin': 'no-cors',
    'Content-Type': 'application/json;charset=utf-8',
  },
});

export default {
  post: (url: string, data?: any) => RemoteAPI.post(url, data || null),
  get: (url: string) => RemoteAPI.get(url),
  delete: (url: string) => RemoteAPI.delete(url),
  patch: (url: string, data: any) => RemoteAPI.patch(url, data || null),
  put: (url: string, data: any) => RemoteAPI.put(url, data || null),
};
