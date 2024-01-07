/* eslint-disable @typescript-eslint/no-explicit-any */

export default {
  post: (url: string, data: any) =>
    fetch(url, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': 'no-cors',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data) || null,
    }),
  get: (url: string) => fetch(url),
  delete: (url: string) => fetch(url, { method: 'DELETE' }),
  patch: (url: string, data: any) =>
    fetch(url, {
      method: 'PATCH',
      headers: {
        'Access-Control-Allow-Origin': 'no-cors',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data) || null,
    }),
  put: (url: string, data: any) =>
    fetch(url, {
      method: 'PUT',
      headers: {
        'Access-Control-Allow-Origin': 'no-cors',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data) || null,
    }),
};
