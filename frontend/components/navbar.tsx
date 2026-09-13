"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    Menu,
    Plus,
    X,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { getBoards } from "@/libs/boards";
import { Board } from "@/libs/types/board";
import CreateBoardModal from "./board/create-board-modal";

const Navbar = () => {
    const [isNavOpen, setIsNavOpen] = useState(true);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const pathname = usePathname();

    const {
        data: boards = [],
        isLoading,
        isError,
    } = useQuery<Board[]>({
        queryKey: ["boards"],
        queryFn: getBoards,
    });

    const closeMobileNav = () => {
        setIsMobileNavOpen(false);
    };

    const openCreateBoardModal = () => {
        setOpenModal(true);
        closeMobileNav();
    };

    return (
        <>
            {/* ===================================================== */}
            {/* MOBILE NAVBAR                                        */}
            {/* ===================================================== */}

            <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-[#2B2C37] px-4 md:hidden">
                {/* Logo */}
                <Link
                    href="/board"
                    className="text-xl font-bold tracking-tight text-indigo-500"
                >
                    kanban
                </Link>

                {/* Right */}
                <button
                    type="button"
                    onClick={() => setIsMobileNavOpen(true)}
                    aria-label="Open navigation"
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/5 hover:text-white"
                >
                    <Menu size={21} />
                </button>
            </header>

            {/* ===================================================== */}
            {/* MOBILE DRAWER                                         */}
            {/* ===================================================== */}

            {isMobileNavOpen && (
                <div className="fixed inset-0 z-60 md:hidden">
                    <button
                        type="button"
                        aria-label="Close navigation"
                        onClick={closeMobileNav}
                        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
                    />

                    <aside className="absolute left-0 top-0 flex h-full w-[290px] flex-col border-r border-white/10 bg-[#2B2C37] shadow-2xl">
                        <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5">
                            <Link
                                href="/boards"
                                onClick={closeMobileNav}
                                className="text-xl font-bold tracking-tight text-indigo-500"
                            >
                                kanban
                            </Link>

                            <button
                                type="button"
                                onClick={closeMobileNav}
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

                            <div className="space-y-1 pr-4">
                                {isLoading && (
                                    <div className="px-5 py-3 text-sm text-gray-500">
                                        Loading boards...
                                    </div>
                                )}

                                {isError && (
                                    <div className="px-5 py-3 text-sm text-red-400">
                                        Failed to load boards.
                                    </div>
                                )}

                                {!isLoading &&
                                    !isError &&
                                    boards.length === 0 && (
                                        <div className="px-5 py-3">
                                            <p className="text-sm text-gray-500">
                                                No boards yet.
                                            </p>

                                            <p className="mt-1 text-xs text-gray-600">
                                                Create your first board below.
                                            </p>
                                        </div>
                                    )}

                                {boards.map((board) => {
                                    const isActive =
                                        pathname === `/boards/${board.id}`;

                                    return (
                                        <Link
                                            key={board.id}
                                            href={`/boards/${board.id}`}
                                            onClick={closeMobileNav}
                                            className={`group relative flex items-center gap-3 rounded-r-xl px-5 py-3 text-sm font-medium transition-all ${
                                                isActive
                                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10"
                                                    : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                                            }`}
                                        >
                                            {isActive && (
                                                <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-indigo-300" />
                                            )}

                                            <LayoutDashboard
                                                size={17}
                                                className={
                                                    isActive
                                                        ? "text-white"
                                                        : "text-gray-600 transition group-hover:text-gray-400"
                                                }
                                            />

                                            <span className="min-w-0 truncate">
                                                {board.name}
                                            </span>
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* Create board */}
                            <div className="px-5 pt-5">
                                <button
                                    type="button"
                                    onClick={openCreateBoardModal}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-indigo-500/40 bg-indigo-500/5 px-4 py-3 text-sm font-medium text-indigo-400 transition hover:border-indigo-500/70 hover:bg-indigo-500/10 hover:text-indigo-300"
                                >
                                    <Plus size={17} />
                                    Create new board
                                </button>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="shrink-0 border-t border-white/10 p-4">
                            <p className="text-center text-[11px] text-gray-600">
                                Organize your work
                            </p>
                        </div>
                    </aside>
                </div>
            )}

            {/* ===================================================== */}
            {/* DESKTOP NAVBAR                                        */}
            {/* ===================================================== */}

            <div className="hidden md:block">
                <aside
                    className={`sticky left-0 top-0 z-40 h-screen overflow-hidden border-r border-white/10 bg-[#2B2C37] transition-all duration-300 ${
                        isNavOpen ? "w-72" : "w-0 border-r-0"
                    }`}
                >
                    <div className="flex h-full w-72 flex-col">
                        {/* Header */}
                        <div className="flex h-[89px] shrink-0 items-center border-b border-white/10 px-6">
                            <Link
                                href="/board"
                                className="text-2xl font-bold tracking-tight text-indigo-500 transition hover:text-indigo-400"
                            >
                                kanban
                            </Link>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto py-6">
                            <div className="mb-4 flex items-center justify-between px-6">
                                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-500">
                                    All Boards
                                </p>

                                <span className="rounded-md bg-white/5 px-2 py-1 text-[11px] font-medium text-gray-500">
                                    {boards.length}
                                </span>
                            </div>

                            {/* Board list */}
                            <div className="space-y-1 pr-4">
                                {isLoading && (
                                    <div className="px-6 py-3 text-sm text-gray-500">
                                        Loading boards...
                                    </div>
                                )}

                                {isError && (
                                    <div className="px-6 py-3 text-sm text-red-400">
                                        Failed to load boards.
                                    </div>
                                )}

                                {!isLoading &&
                                    !isError &&
                                    boards.length === 0 && (
                                        <div className="px-6 py-3">
                                            <p className="text-sm text-gray-500">
                                                No boards yet.
                                            </p>

                                            <p className="mt-1 text-xs text-gray-600">
                                                Create your first board below.
                                            </p>
                                        </div>
                                    )}

                                {boards.map((board) => {
                                    const isActive =
                                        pathname === `/boards/${board.id}`;

                                    return (
                                        <Link
                                            key={board.id}
                                            href={`/boards/${board.id}`}
                                            className={`group relative flex items-center gap-3 rounded-r-xl px-6 py-3 text-sm font-medium transition-all ${
                                                isActive
                                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10"
                                                    : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                                            }`}
                                        >
                                            {isActive && (
                                                <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-indigo-300" />
                                            )}

                                            <LayoutDashboard
                                                size={17}
                                                className={
                                                    isActive
                                                        ? "text-white"
                                                        : "text-gray-600 transition group-hover:text-gray-400"
                                                }
                                            />

                                            <span className="min-w-0 truncate">
                                                {board.name}
                                            </span>
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* Create board */}
                            <div className="px-6 pt-5">
                                <button
                                    type="button"
                                    onClick={() => setOpenModal(true)}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-indigo-500/40 bg-indigo-500/5 px-4 py-3 text-sm font-medium text-indigo-400 transition hover:border-indigo-500/70 hover:bg-indigo-500/10 hover:text-indigo-300"
                                >
                                    <Plus size={17} />
                                    Create new board
                                </button>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="shrink-0 border-t border-white/10 p-4">
                            <p className="text-center text-[11px] text-gray-600">
                                Organize your work
                            </p>
                        </div>
                    </div>
                </aside>

                {/* Collapse button */}
                <button
                    type="button"
                    onClick={() => setIsNavOpen((prev) => !prev)}
                    aria-label={
                        isNavOpen ? "Collapse sidebar" : "Expand sidebar"
                    }
                    className={`fixed bottom-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 transition-all duration-300 hover:bg-indigo-500 ${
                        isNavOpen ? "left-[268px]" : "left-4"
                    }`}
                >
                    {isNavOpen ? (
                        <ChevronLeft size={18} />
                    ) : (
                        <ChevronRight size={18} />
                    )}
                </button>
            </div>

            {/* Create Board Modal */}
            <CreateBoardModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            />
        </>
    );
};

export default Navbar;
