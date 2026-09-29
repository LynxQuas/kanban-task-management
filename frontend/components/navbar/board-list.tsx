"use client";

import Link from "next/link";
import { LayoutDashboard } from "lucide-react";

import { Board } from "@/libs/types/board";

type BoardListProps = {
    boards: Board[];
    isLoading: boolean;
    isError: boolean;
    pathname: string;
    onBoardClick?: () => void;
};

const BoardList = ({
    boards,
    isLoading,
    isError,
    pathname,
    onBoardClick,
}: BoardListProps) => {
    return (
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

            {!isLoading && !isError && boards.length === 0 && (
                <div className="px-6 py-3">
                    <p className="text-sm text-gray-500">No boards yet.</p>

                    <p className="mt-1 text-xs text-gray-600">
                        Create your first board below.
                    </p>
                </div>
            )}

            {boards.map((board) => {
                const isActive = pathname === `/boards/${board.id}`;

                return (
                    <Link
                        key={board.id}
                        href={`/boards/${board.id}`}
                        onClick={onBoardClick}
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

                        <span className="min-w-0 truncate">{board.name}</span>
                    </Link>
                );
            })}
        </div>
    );
};

export default BoardList;
