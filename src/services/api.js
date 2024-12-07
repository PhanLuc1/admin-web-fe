import axios from 'axios';

const apiService = (() => {
    const API_BASE_URL = 'https://your-api-domain.com/api';

    const TOKEN_KEY = 'authToken';

    const axiosInstance = axios.create({
        baseURL: API_BASE_URL,
        timeout: 10000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    axiosInstance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem(TOKEN_KEY);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
        (response) => response.data,
        (error) => {
            if (error.response) {
                if (error.response.status === 401) {
                    console.error('Unauthorized access - perhaps you need to log in again.');
                }
                if (error.response.status === 403) {
                    console.error('Forbidden - you do not have permission to access this resource.');
                }
            }
            return Promise.reject(error);
        }
    );

    const setToken = (token) => {
        localStorage.setItem(TOKEN_KEY, token);
    };

    const clearToken = () => {
        localStorage.removeItem(TOKEN_KEY);
    };

    const get = (url, params = {}) => axiosInstance.get(url, { params });
    const post = (url, data = {}) => axiosInstance.post(url, data);
    const put = (url, data = {}) => axiosInstance.put(url, data);
    const del = (url, params = {}) => axiosInstance.delete(url, { params });

    return {
        get,
        post,
        put,
        delete: del,
        setToken,
        clearToken,
    };
})();

export default apiService;
