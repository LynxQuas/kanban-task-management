"use client";

import { ReactNode } from "react";
import { Trash2, TriangleAlert } from "lucide-react";
import ModalLayout from "./modal-layout";

type DeleteConfirmationModalProps = {
    isOpen: boolean;
    isPending: boolean;
    title: string;
    description: ReactNode;
    confirmLabel: string;
    pendingLabel?: string;
    onClose: () => void;
    onConfirm: () => void;
};

const DeleteConfirmationModal = ({
    isOpen,
    isPending,
    title,
    description,
    confirmLabel,
    pendingLabel = "Deleting...",
    onClose,
    onConfirm,
}: DeleteConfirmationModalProps) => {
    return (
        <ModalLayout
            isOpen={isOpen}
            onClose={() => {
                if (!isPending) {
                    onClose();
                }
            }}
        >
            <div className="flex flex-col">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-red-400/10">
                    <TriangleAlert size={21} className="text-red-400" />
                </div>

                <h2 className="text-lg font-semibold text-white">{title}</h2>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                    {description}
                </p>

                <div className="mt-6 flex justify-end gap-2">
                    <button
                        type="button"
                        disabled={isPending}
                        onClick={onClose}
                        className="rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        disabled={isPending}
                        onClick={onConfirm}
                        className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Trash2 size={15} />

                        {isPending ? pendingLabel : confirmLabel}
                    </button>
                </div>
            </div>
        </ModalLayout>
    );
};

export default DeleteConfirmationModal;
