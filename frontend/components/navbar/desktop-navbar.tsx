"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

import { Board } from "@/libs/types/board";
import { User } from "@/libs/types/auth";
import BoardList from "./board-list";
import UserProfile from "./user-profile";

type DesktopNavbarProps = {
    boards: Board[];
    isLoading: boolean;
    isError: boolean;
    user: User | undefined;
    isUserLoading: boolean;
    onLogout: () => void;
    onCreateBoard: () => void;
};

const DesktopNavbar = ({
    boards,
    user,
    isUserLoading,
    isLoading,
    isError,
    onLogout,
    onCreateBoard,
}: DesktopNavbarProps) => {
    const [isNavOpen, setIsNavOpen] = useState(true);

    const pathname = usePathname();

    return (
        <div className="hidden md:block">
            <aside
                className={`sticky left-0 top-0 z-40 h-screen overflow-hidden border-r border-white/10 bg-[#2B2C37] transition-all duration-300 ${
                    isNavOpen ? "w-72" : "w-0 border-r-0"
                }`}
            >
                <div className="flex h-full w-72 flex-col">
                    {/* Header */}
                    <div className="flex h-22.25 shrink-0 items-center border-b border-white/10 px-6">
                        <Link
                            href="/board"
                            className="text-2xl font-bold tracking-tight text-indigo-500 transition hover:text-indigo-400"
                        >
                            kanban
                        </Link>
                    </div>

                    {/* Boards */}
                    <div className="flex-1 overflow-y-auto py-6">
                        <div className="mb-4 flex items-center justify-between px-6">
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
                        />

                        <div className="px-6 pt-5">
                            <button
                                type="button"
                                onClick={onCreateBoard}
                                className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-indigo-500/40 bg-indigo-500/5 px-4 py-3 text-sm font-medium text-indigo-400 transition hover:border-indigo-500/70 hover:bg-indigo-500/10 hover:text-indigo-300"
                            >
                                <Plus size={17} />
                                Create new board
                            </button>
                        </div>
                    </div>

                    {/* User Profile */}
                    <div className="shrink-0 border-t border-white/10 p-4">
                        <UserProfile
                            user={user}
                            isLoading={isUserLoading}
                            onLogout={onLogout}
                        />
                    </div>
                </div>
            </aside>

            {/* Collapse Button */}
            <button
                type="button"
                onClick={() => setIsNavOpen((prev) => !prev)}
                aria-label={isNavOpen ? "Collapse sidebar" : "Expand sidebar"}
                className={`fixed bottom-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:bg-indigo-500 ${
                    isNavOpen ? "left-67" : "left-4"
                }`}
            >
                {isNavOpen ? (
                    <ChevronLeft size={18} />
                ) : (
                    <ChevronRight size={18} />
                )}
            </button>
        </div>
    );
};

export default DesktopNavbar;
