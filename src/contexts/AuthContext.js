import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [authorities, setAuthorities] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            apiService.get('account')
                .then((res) => {
                    if (res.activated) {
                        setIsAuth(true);
                        setAuthorities(res.authorities || []);
                    }
                })
                .catch(() => setIsAuth(false))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
            setIsAuth(false);
            navigate('/login');
        }
    }, []);

    const loginRedirect = () => {
        if (!isAuth && !loading) {
            navigate('/login');
        }
    };

    return (
        <AuthContext.Provider value={{ isAuth, authorities, setIsAuth, loginRedirect }}>
            {!loading ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
};

export default AuthContext;
