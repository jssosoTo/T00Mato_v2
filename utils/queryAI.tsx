/* eslint-disable @typescript-eslint/no-explicit-any */

// access-token: 24.e785ec9d15d941ac0b7f11b4a2959f8f.2592000.1709284326.282335-48868926
const queryAI = async (data: any) => {
  console.log(
    JSON.stringify({
      messages: data,
    })
  );
  return fetch('/ai', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      messages: data,
    }),
  });
};

// import axios from 'axios';

// const RemoteAPI = axios.create({
//   baseURL: 'localhost:8080',
//   headers: {
//     'Access-Control-Allow-Origin': 'no-cors',
//     'Content-Type': 'application/json;charset=utf-8',
//   },
// });

// const queryAI = async (data: any) => {
//   return RemoteAPI.post('/ai', data);
// };

export default queryAI;
