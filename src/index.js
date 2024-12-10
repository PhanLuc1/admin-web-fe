import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US'; // Ngôn ngữ tiếng Anh (hoặc dùng viVN cho Tiếng Việt)
// import "antd/dist/reset.css"; // CSS từ Ant Design
// import "@ant-design/pro-components/dist/reset.css"; // CSS từ ProComponents

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <ConfigProvider locale={enUS}>
            <App />
        </ConfigProvider>
    </React.StrictMode>
);
