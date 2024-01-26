import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import AppAPI from './components/Context/AppAPI/AppAPI.tsx';
import { ConfigProvider } from 'antd';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <AppAPI>
        <ConfigProvider
          theme={{ token: { colorPrimary: 'var(--main-color)' } }}
        >
          <App />
        </ConfigProvider>
      </AppAPI>
    </Router>
  </React.StrictMode>
);
