import React, { createContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import apiService from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [authorities, setAuthorities] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();  // Get current location

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            apiService.get('account')
                .then((res) => {
                    if (res.data.activated) {
                        setIsAuth(true);
                        setAuthorities(res.data.authorities || []);
                    } else {
                        setIsAuth(false);
                        // Optionally, you might want to clear the token here if the account is not activated
                        localStorage.removeItem('token');
                    }
                })
                .catch((error) => {
                    console.error('Error checking authentication:', error);
                    setIsAuth(false);
                    localStorage.removeItem('token');  // Clear token on error
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
            setIsAuth(false);
            // Only redirect to login if not on login page
            if (location.pathname !== '/login') {
                navigate('/login', { replace: true });
            }
        }
    }, [navigate, location]);

    const loginRedirect = () => {
        if (!isAuth && !loading && location.pathname !== '/login') {
            navigate('/login', { replace: true });
        }
    };

    return (
        <AuthContext.Provider value={{ isAuth, authorities, setIsAuth, setAuthorities, loginRedirect }}>
            {!loading ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
};

export default AuthContext;