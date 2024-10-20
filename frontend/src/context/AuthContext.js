import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api from '../api'; // Assuming you have a centralized API method setup

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const authenticateUser = useCallback(async (token) => {
        try {
            const response = await api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } });
            setUser({ ...response.data, token }); // Store user and token
        } catch (error) {
            console.error("Failed to authenticate user", error);
            logout(); // Logout on error
        }
    }, []);

    useEffect(() => {
        const userToken = localStorage.getItem('token');
        if (userToken) {
            authenticateUser(userToken);
        }
    }, [authenticateUser]); // Now authenticateUser is correctly included in the dependency array

    const login = async (token) => {
        localStorage.setItem('token', token);
        await authenticateUser(token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = { user, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
