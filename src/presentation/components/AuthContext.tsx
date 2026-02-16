import React, { createContext, useContext, useState, useEffect } from 'react';

export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (email: string, password: string, name: string) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        // Mock login - in real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

        // Mock validation
        if (email && password.length >= 6) {
            const mockUser: User = {
                id: '1',
                email,
                name: email.split('@')[0],
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
            };

            setUser(mockUser);
            localStorage.setItem('user', JSON.stringify(mockUser));
            return true;
        }

        return false;
    };

    const signup = async (email: string, password: string, name: string): Promise<boolean> => {
        // Mock signup - in real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

        // Mock validation
        if (email && password.length >= 6 && name) {
            const mockUser: User = {
                id: Date.now().toString(),
                email,
                name,
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
            };

            setUser(mockUser);
            localStorage.setItem('user', JSON.stringify(mockUser));
            return true;
        }

        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            signup,
            logout,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
