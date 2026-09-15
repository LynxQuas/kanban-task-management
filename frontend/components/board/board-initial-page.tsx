"use client";
import { getBoards } from "@/libs/boards";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LoadingSpinner from "../ui/loading-spinner";
import ErrorUi from "../ui/error-ui";
import { LayoutDashboard } from "lucide-react";
import CreateFirstBoard from "./create-first-board";
import BoardModal from "./board-modal";

const BoardInitialPage = () => {
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
                <LoadingSpinner />
            </main>
        );
    }

    if (isError) {
        return (
            <main className="flex h-full min-h-screen items-center justify-center bg-[#20212C]">
                <ErrorUi errorText="Failed to load boards" />
            </main>
        );
    }

    if (boards.length === 0) {
        return (
            <>
                <main className="flex min-h-screen items-center justify-center bg-[#20212C] px-6">
                    <CreateFirstBoard
                        onOpenBoardCreateModal={() =>
                            setOpenBoardCreateModal(true)
                        }
                    />
                </main>

                <BoardModal
                    isOpen={openBoardCreateModal}
                    onClose={() => setOpenBoardCreateModal(false)}
                />
            </>
        );
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#20212C]  px-6">
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

export default BoardInitialPage;
