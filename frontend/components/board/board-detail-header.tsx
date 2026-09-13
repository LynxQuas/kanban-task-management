"use client";

import {
    EllipsisVertical,
    LayoutDashboard,
    Plus,
    Pencil,
    Trash2,
    TriangleAlert,
} from "lucide-react";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import CreateTaskModal from "./create-task-modal";

import { Column } from "@/libs/types/board";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useClickOutside } from "@/hooks/useClickOutside";
import { deleteBoard } from "@/libs/boards";
import ModalLayout from "../modal-layout";

type BoardDetailHeaderProps = {
    board_name: string;
    board_id: number;
    columns: Column[];
};

const BoardDetailHeader = ({
    board_name,
    columns,
    board_id,
}: BoardDetailHeaderProps) => {
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const queryClient = useQueryClient();
    const router = useRouter();

    const menuRef = useRef<HTMLDivElement>(null);

    const { mutate: deleteBoardMutation, isPending } = useMutation({
        mutationFn: deleteBoard,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["boards"],
            });

            setIsDeleteModalOpen(false);
            router.push("/boards");
        },

        onError: (error) => {
            console.error(error);
        },
    });

    const handleEditBoard = () => {
        setIsMenuOpen(false);

        console.log("Edit board");
    };

    const handleDeleteBoard = () => {
        setIsMenuOpen(false);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        deleteBoardMutation(board_id);
    };

    useClickOutside(menuRef, () => {
        setIsMenuOpen(false);
    });

    useEscapeKey(() => {
        setIsMenuOpen(false);
    });

    return (
        <>
            <header className="flex shrink-0 items-center justify-between border-b border-white/10 bg-[#2B2C37] px-6 py-4">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-600/15">
                        <LayoutDashboard
                            size={18}
                            className="text-indigo-400"
                        />
                    </div>

                    <div className="min-w-0">
                        <h1 className="truncate text-base font-semibold text-white">
                            {board_name}
                        </h1>

                        <p className="text-xs text-gray-500">
                            Manage your tasks and workflow
                        </p>
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setIsTaskModalOpen(true)}
                        className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-600/10 transition hover:bg-indigo-500 active:scale-[0.98]"
                    >
                        <Plus size={16} />

                        <span className="hidden sm:block">Add new task</span>
                    </button>

                    <div ref={menuRef} className="relative">
                        <button
                            type="button"
                            aria-label="Board options"
                            aria-expanded={isMenuOpen}
                            onClick={() => setIsMenuOpen((open) => !open)}
                            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/5 text-gray-400 transition hover:bg-white/5 hover:text-white"
                        >
                            <EllipsisVertical size={18} />
                        </button>

                        {isMenuOpen && (
                            <div className="absolute right-0 top-12 z-50 w-48 overflow-hidden rounded-lg border border-white/10 bg-[#2B2C37] p-1 shadow-xl">
                                <button
                                    type="button"
                                    onClick={handleEditBoard}
                                    className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
                                >
                                    <Pencil size={15} />

                                    <span>Edit board</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={handleDeleteBoard}
                                    className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-400/10 hover:text-red-300"
                                >
                                    <Trash2 size={15} />

                                    <span>Delete board</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <CreateTaskModal
                columns={columns}
                isOpen={isTaskModalOpen}
                onClose={() => setIsTaskModalOpen(false)}
            />

            <ModalLayout
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    if (!isPending) {
                        setIsDeleteModalOpen(false);
                    }
                }}
            >
                <div className="flex flex-col">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-red-400/10">
                        <TriangleAlert size={21} className="text-red-400" />
                    </div>

                    <h2 className="text-lg font-semibold text-white">
                        Delete board?
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-400">
                        Are you sure you want to delete{" "}
                        <span className="font-medium text-gray-200">
                            &quot;{board_name}&quot;
                        </span>
                        ? This action will permanently delete the board and its
                        tasks.
                    </p>

                    <div className="mt-6 flex justify-end gap-2">
                        <button
                            type="button"
                            disabled={isPending}
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            disabled={isPending}
                            onClick={handleConfirmDelete}
                            className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Trash2 size={15} />

                            {isPending ? "Deleting..." : "Delete board"}
                        </button>
                    </div>
                </div>
            </ModalLayout>
        </>
    );
};

export default BoardDetailHeader;
