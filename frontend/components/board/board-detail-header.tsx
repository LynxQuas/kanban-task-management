"use client";

import { LayoutDashboard, Plus } from "lucide-react";
import { useState } from "react";
import CreateTaskModal from "../task/task-modal";
import { Board } from "@/libs/types/board";
import DropDownActions from "../ui/drop-down-actions";
import BoardModal from "./board-modal";
import DeleteBoardModal from "./delete-board-modal";

type BoardDetailHeaderProps = {
    boardData: Board;
};

const BoardDetailHeader = ({
    boardData: { id: board_id, name: board_name, columns },
}: BoardDetailHeaderProps) => {
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [editBoardModalOpen, setEditBoardModalOpen] = useState(false);

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

            <DeleteBoardModal
                boardId={board_id}
                boardName={board_name}
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
            />
        </>
    );
};

export default BoardDetailHeader;
