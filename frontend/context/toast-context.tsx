"use client";

import Toast from "@/components/ui/toast";
import {
    createContext,
    useCallback,
    useContext,
    useState,
    type ReactNode,
} from "react";

type ToastType = "success" | "error" | "info" | "warning";

type Toast = {
    id: number;
    message: string;
    type: ToastType;
};

type ToastContextType = {
    showToast: (message: string, type?: ToastType) => void;
    removeToast: (id: number) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: number) => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
    }, []);

    const showToast = useCallback(
        (message: string, type: ToastType = "success") => {
            const id = Date.now();

            setToasts((current) => [
                ...current,
                {
                    id,
                    message,
                    type,
                },
            ]);

            setTimeout(() => {
                removeToast(id);
            }, 3000);
        },
        [removeToast],
    );

    return (
        <ToastContext.Provider value={{ showToast, removeToast }}>
            {children}

            <div className="fixed right-4 top-4 z-50 flex w-full max-w-sm flex-col gap-3">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        toast={toast}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error("useToast must be used inside a ToastProvider");
    }

    return context;
};
