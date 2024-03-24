import React, {createContext, ReactNode, useContext, useState} from 'react';
import {login, refreshToken} from "../operations/authOperation";

interface AuthContextProps {
    getToken: () => string | null;
    login: (username: string, password: string) => Promise<void>;
    refreshToken: () => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [access_token, setAccess_token] = useState(localStorage.getItem('access_token') ?? null);
    const [refresh_token, setRefresh_token] = useState(localStorage.getItem('refresh_token') ?? null);
    const [isLoading, setIsLoading] = useState(false);

    const getToken = () => {
        return localStorage.getItem('access_token');
    }

    const loginHandler = async (username: string, password: string) => {
        try {
            setIsLoading(true);
            const data = await login(username, password);
            setAccess_token(data.access_token);
            setRefresh_token(data.refresh_token);
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);
        } catch (error) {
            //todo: add proper error handling
            console.error('Login error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const refreshTokenHandler = async () => {
        try {
            setIsLoading(true);
            const data = await refreshToken(refresh_token);
            setAccess_token(data.access_token);
            localStorage.setItem('access_token', data.access_token);
        } catch (error) {
            //todo: add proper error handling
            console.error('Token refresh error:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logoutHandler = () => {
        setAccess_token(null);
        setRefresh_token(null);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    };

    return (
        <AuthContext.Provider
            value={{
                getToken: getToken,
                login: loginHandler,
                refreshToken: refreshTokenHandler,
                logout: logoutHandler,
                isLoading
            }}
        >{children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    //todo: add useEffect to refresh token when expired
    // useEffect(() => {
    //     if (context.access_token && isTokenExpired(context.access_token)) {
    //         context.refresh_token();
    //     }
    // }, [context]);

    return context;
};