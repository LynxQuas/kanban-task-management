"use client";

import { LayoutDashboard, Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { getBoards } from "@/libs/boards";
import { useState } from "react";
import BoardModal from "@/components/board/board-modal";

const BoardPage = () => {
    const [openBoardCreateModal, setOpenBoardCreateModal] = useState(false);
    const {
        data: boards = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["boards"],
        queryFn: getBoards,
    });

    if (isLoading) {
        return (
            <main className="flex h-full min-h-screen items-center justify-center bg-[#20212C]">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-indigo-500" />

                    <p className="text-sm text-gray-500">
                        Loading your boards...
                    </p>
                </div>
            </main>
        );
    }

    if (isError) {
        return (
            <main className="flex h-full min-h-screen items-center justify-center bg-[#20212C]">
                <div className="text-center">
                    <h1 className="text-lg font-semibold text-white">
                        Something went wrong
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        We couldn&apos;t load your boards.
                    </p>
                </div>
            </main>
        );
    }

    if (boards.length === 0) {
        return (
            <>
                <main className="flex min-h-screen items-center justify-center bg-[#20212C] px-6">
                    <div className="w-full max-w-lg text-center">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[#2B2C37] shadow-xl shadow-black/10">
                            <LayoutDashboard
                                size={28}
                                className="text-indigo-400"
                            />
                        </div>

                        <h1 className="text-2xl font-semibold tracking-tight text-white">
                            Create your first board
                        </h1>

                        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
                            Boards help you organize projects, track tasks, and
                            keep your work moving forward.
                        </p>

                        <button
                            onClick={() => setOpenBoardCreateModal(true)}
                            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-600/10 transition hover:bg-indigo-500"
                        >
                            <Plus size={17} />
                            Create your first board
                        </button>
                    </div>
                </main>

                <BoardModal
                    isOpen={openBoardCreateModal}
                    onClose={() => setOpenBoardCreateModal(false)}
                />
            </>
        );
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#20212C] px-6">
            <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#2B2C37] p-8 text-center shadow-2xl shadow-black/10">
                <LayoutDashboard
                    size={28}
                    className="mx-auto text-indigo-400"
                />

                <h1 className="mt-4 text-xl font-semibold text-white">
                    Choose a board
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Select a board from the sidebar to get started.
                </p>
            </div>
        </main>
    );
};

export default BoardPage;
