"use client";

import {
    AlertCircle,
    CheckCircle2,
    Info,
    TriangleAlert,
    X,
} from "lucide-react";

type ToastType = "success" | "error" | "info" | "warning";

type ToastData = {
    id: number;
    message: string;
    type: ToastType;
};

type ToastProps = {
    toast: ToastData;
    onClose: () => void;
};

const toastStyles = {
    success: {
        icon: CheckCircle2,
        iconClass: "text-emerald-400",
    },
    error: {
        icon: AlertCircle,
        iconClass: "text-red-400",
    },
    warning: {
        icon: TriangleAlert,
        iconClass: "text-amber-400",
    },
    info: {
        icon: Info,
        iconClass: "text-blue-400",
    },
};

const Toast = ({ toast, onClose }: ToastProps) => {
    const { icon: Icon, iconClass } = toastStyles[toast.type];

    return (
        <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#2B2C37] p-4 shadow-2xl shadow-black/30">
            <Icon size={20} className={`mt-0.5 shrink-0 ${iconClass}`} />

            <p className="flex-1 text-sm font-medium text-gray-200">
                {toast.message}
            </p>

            <button
                type="button"
                onClick={onClose}
                className="shrink-0 text-gray-500 transition hover:text-gray-300"
                aria-label="Close notification"
            >
                <X size={16} />
            </button>
        </div>
    );
};

export default Toast;
