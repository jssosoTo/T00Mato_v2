/* eslint-disable @typescript-eslint/no-explicit-any */

const queryAI = async (data: any) => {
  return fetch(
    'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=Wx6BcWmvoutjDpgDfI3qTdUK&client_secret=GFuBT9hghD6scWtAsO2udGaf3XSddViP',
    {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      // body: JSON.stringify({
      //   messages: data,
      // }),
    }
  );
};

export default queryAI;
