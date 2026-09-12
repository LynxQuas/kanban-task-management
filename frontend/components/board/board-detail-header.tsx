"use client";

import {
    EllipsisVertical,
    LayoutDashboard,
    Plus,
    Pencil,
    Trash2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import CreateTaskModal from "./create-task-modal";
import { Column } from "@/libs/types/board";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useClickOutside } from "@/hooks/useClickOutside";

type BoardDetailHeaderProps = {
    board_name: string;
    columns: Column[];
};

const BoardDetailHeader = ({ board_name, columns }: BoardDetailHeaderProps) => {
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    useClickOutside(menuRef, () => {
        setIsMenuOpen(false);
    });

    useEscapeKey(() => {
        setIsMenuOpen(false);
    });

    const handleEditBoard = () => {
        setIsMenuOpen(false);

        console.log("Edit board");
    };

    const handleDeleteBoard = () => {
        setIsMenuOpen(false);

        // TODO: Delete board
        console.log("Delete board");
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
                        className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-600/10 transition hover:bg-indigo-500 active:scale-[0.98] "
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
                            className=" flex h-10 w-10 items-center justify-center rounded-lg border border-white/5 text-gray-400 transition hover:bg-white/5 hover:text-white "
                        >
                            <EllipsisVertical size={18} />
                        </button>

                        {isMenuOpen && (
                            <div className=" absolute right-0 top-12 z-50 w-48 overflow-hidden rounded-lg border border-white/10 bg-[#2B2C37] p-1 shadow-xl ">
                                <button
                                    type="button"
                                    onClick={handleEditBoard}
                                    className=" flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white "
                                >
                                    <Pencil size={15} />

                                    <span>Edit board</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={handleDeleteBoard}
                                    className=" flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-400/10 hover:text-red-300 "
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
        </>
    );
};

export default BoardDetailHeader;
