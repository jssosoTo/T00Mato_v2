/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const RemoteAPI = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "no-cors",
    // 'Access-Control-Allow-Origin': 'no-cors',
    "Content-Type": "application/json;charset=utf-8",
  },
});

RemoteAPI.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "access_token"
    )}`;
    console.log("access_token = ", localStorage.getItem("access_token"));
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  post: (url: string, data?: any) => RemoteAPI.post(url, data || null),
  get: (url: string) => RemoteAPI.get(url),
  delete: (url: string) => RemoteAPI.delete(url),
  patch: (url: string, data: any) => RemoteAPI.patch(url, data || null),
  put: (url: string, data: any) => RemoteAPI.put(url, data || null),
};
