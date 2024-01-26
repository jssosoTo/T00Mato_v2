import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = React.memo(function () {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex-all-center">
      <div>
        <h2
          style={{
            fontWeight: 500,
            textAlign: 'center',
            fontSize: '6rem',
            color: 'var(--main-color)',
            marginTop: '4rem',
          }}
        >
          404 NOT FOUND
        </h2>
        <div style={{ textAlign: 'center' }}>
          <Button
            type="primary"
            style={{
              fontSize: '2rem',
              height: 'max-content',
              margin: '4rem 0',
            }}
            onClick={() => navigate('/todo', { replace: true })}
          >
            前往待办
          </Button>
        </div>
      </div>
    </div>
  );
});

export default Error;
