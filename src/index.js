import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import {AuthProvider} from "./contexts/AuthContext";
import {BrowserRouter} from "react-router-dom"; // Ngôn ngữ tiếng Anh (hoặc dùng viVN cho Tiếng Việt)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <ConfigProvider locale={enUS}>
            <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
            </BrowserRouter>
        </ConfigProvider>
    </React.StrictMode>
);
