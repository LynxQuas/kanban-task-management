"use client";

import { useState } from "react";
import { Menu, Plus, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Board } from "@/libs/types/board";
import { User } from "@/libs/types/auth";
import BoardList from "./board-list";
import UserProfile from "./user-profile";

type MobileNavbarProps = {
    boards: Board[];
    isLoading: boolean;
    isError: boolean;
    user: User | undefined;
    isUserLoading: boolean;
    onCreateBoard: () => void;
    onLogout: () => void;
};

const MobileNavbar = ({
    boards,
    isLoading,
    isError,
    user,
    isUserLoading,
    onCreateBoard,
    onLogout,
}: MobileNavbarProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const pathname = usePathname();

    const close = () => {
        setIsOpen(false);
    };

    const handleCreateBoard = () => {
        close();
        onCreateBoard();
    };

    return (
        <>
            <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-[#2B2C37] px-4 md:hidden">
                <Link
                    href="/board"
                    className="text-xl font-bold tracking-tight text-indigo-500"
                >
                    kanban
                </Link>

                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    aria-label="Open navigation"
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/5 hover:text-white"
                >
                    <Menu size={21} />
                </button>
            </header>

            {isOpen && (
                <div className="fixed inset-0 z-60 md:hidden">
                    <button
                        type="button"
                        aria-label="Close navigation"
                        onClick={close}
                        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
                    />

                    <aside className="absolute left-0 top-0 flex h-full w-72.5 flex-col border-r border-white/10 bg-[#2B2C37] shadow-2xl">
                        <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5">
                            <Link
                                href="/boards"
                                onClick={close}
                                className="text-xl font-bold tracking-tight text-indigo-500"
                            >
                                kanban
                            </Link>

                            <button
                                type="button"
                                onClick={close}
                                aria-label="Close navigation"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-white/5 hover:text-white"
                            >
                                <X size={19} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto py-6">
                            <div className="mb-4 flex items-center justify-between px-5">
                                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500">
                                    All Boards
                                </p>

                                <span className="rounded-md bg-white/5 px-2 py-1 text-[11px] font-medium text-gray-500">
                                    {boards.length}
                                </span>
                            </div>

                            <BoardList
                                boards={boards}
                                isLoading={isLoading}
                                isError={isError}
                                pathname={pathname}
                                onBoardClick={close}
                            />

                            <div className="px-5 pt-5">
                                <button
                                    type="button"
                                    onClick={handleCreateBoard}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-indigo-500/40 bg-indigo-500/5 px-4 py-3 text-sm font-medium text-indigo-400 transition hover:border-indigo-500/70 hover:bg-indigo-500/10 hover:text-indigo-300"
                                >
                                    <Plus size={17} />
                                    Create new board
                                </button>
                            </div>
                        </div>

                        <div className="shrink-0 border-t border-white/10 p-4">
                            <UserProfile
                                user={user}
                                isLoading={isUserLoading}
                                onLogout={onLogout}
                            />
                        </div>
                    </aside>
                </div>
            )}
        </>
    );
};

export default MobileNavbar;
