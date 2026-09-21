"use client";

import { LayoutDashboard, Plus, Trash2, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import CreateTaskModal from "../task/task-modal";
import { Board } from "@/libs/types/board";
import { deleteBoard } from "@/libs/boards";
import ModalLayout from "../modal-layout";
import DropDownActions from "../ui/drop-down-actions";
import BoardModal from "./board-modal";

type BoardDetailHeaderProps = {
    boardData: Board;
};

const BoardDetailHeader = ({
    boardData: { id: board_id, name: board_name, columns },
}: BoardDetailHeaderProps) => {
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editBoardModalOpen, setEditBoardModalOpen] = useState(false);

    const queryClient = useQueryClient();
    const router = useRouter();

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

    const handleConfirmDelete = () => {
        deleteBoardMutation(board_id);
    };

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

                    <DropDownActions
                        handleEdit={() => setEditBoardModalOpen(true)}
                        handleDelete={() => setIsDeleteModalOpen(true)}
                        label="board"
                        iconSize={16}
                    />
                </div>
            </header>

            <CreateTaskModal
                columns={columns}
                isOpen={isTaskModalOpen}
                onClose={() => setIsTaskModalOpen(false)}
            />

            <BoardModal
                isOpen={editBoardModalOpen}
                onClose={() => setEditBoardModalOpen(false)}
                boardData={{
                    id: board_id,
                    name: board_name,
                    columns: columns,
                }}
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
