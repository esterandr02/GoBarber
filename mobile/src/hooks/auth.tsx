import React, {
    createContext,
    useState,
    useCallback,
    useContext,
    useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface AuthDataState {
    token: string;
    user: object;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface AuthContextDTO {
    user: object;
    loading: boolean;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextDTO>({} as AuthContextDTO);

const AuthProvider: React.FC = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [authData, setAuthData] = useState<AuthDataState>(
        {} as AuthDataState,
    );

    useEffect(() => {
        async function getLocalStorageData(): Promise<void> {
            const [token, user] = await AsyncStorage.multiGet([
                '@GoBarber:token',
                '@GoBarber:user',
            ]);

            if (token[1] && user[1]) {
                setAuthData({ token: token[1], user: JSON.parse(user[1]) });
            }
            setLoading(false);
        }
        getLocalStorageData();
    }, []);

    const signIn = useCallback(async ({ email, password }) => {
        const response = await api.post('/sessions', {
            email,
            password,
        });

        const { token, user } = response.data;

        await AsyncStorage.multiSet([
            ['@GoBarber:token', token],
            ['@GoBarber:user', JSON.stringify(user)],
        ]);

        setAuthData({ token, user });
    }, []);

    const signOut = useCallback(async () => {
        await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);

        setAuthData({} as AuthDataState);
    }, []);

    return (
        <AuthContext.Provider
            value={{ user: authData.user, signIn, signOut, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = (): AuthContextDTO => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('userAuth must be used within an AuthProvider !');
    }
    return context;
};

export { AuthProvider, useAuth };
