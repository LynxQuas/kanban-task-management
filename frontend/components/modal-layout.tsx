"use client";

import { useEscapeKey } from "@/hooks/useEscapeKey";
import { ReactNode } from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

export default function ModalLayout({ isOpen, onClose, children }: ModalProps) {
    useEscapeKey(onClose, isOpen);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />

            <div className="relative z-10 w-full max-w-md rounded-lg bg-[#2B2C37] p-6 shadow-xl">
                {children}
            </div>
        </div>
    );
}
