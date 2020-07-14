import React, { createContext, useContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';
import ToastContainer from '../components/ToastContainer';

interface ToastContextDTO {
    addToast(message: Omit<ToastMessage, 'id'>): void;
    removeToast(id: string): void;
}

export interface ToastMessage {
    id: string;
    type: 'success' | 'error' | 'info';
    title: string;
    description?: string;
}

const ToastContext = createContext<ToastContextDTO>({} as ToastContextDTO);

const ToastProvider: React.FC = ({ children }) => {
    const [messages, setMessages] = useState<ToastMessage[]>([]);

    const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>): void => {
        const id = uuid();

        const toast = {
            id,
            type,
            title,
            description,
        };

        setMessages(old => [...old, toast]);
    }, []);

    const removeToast = useCallback((id: string) => {
        setMessages(messages => messages.filter(message => message.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastContainer messages={messages} />
        </ToastContext.Provider>
    );
}

const useToast = (): ToastContextDTO => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('toast must be used within an ToastProvider!');
    }
    return context;
}

export { ToastProvider, useToast };
