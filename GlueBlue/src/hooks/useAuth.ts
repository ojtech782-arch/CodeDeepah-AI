import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authSlice } from '../store/slices/authSlice';
import { googleSignIn } from '../services/googleAuth';
import { loginUser, logoutUser } from '../services/authService';

const useAuth = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const userData = await loginUser(email, password);
            setUser(userData);
            dispatch(authSlice.actions.login(userData));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const googleLogin = async () => {
        setLoading(true);
        setError(null);
        try {
            const userData = await googleSignIn();
            setUser(userData);
            dispatch(authSlice.actions.login(userData));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        setError(null);
        try {
            await logoutUser();
            setUser(null);
            dispatch(authSlice.actions.logout());
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Logic to check if user is already logged in can be added here
    }, []);

    return {
        user,
        loading,
        error,
        login,
        googleLogin,
        logout,
    };
};

export default useAuth;