"use client";

import useBoard from "@/hooks/useBoard";
import BoardDetailHeader from "./board-detail-header";
import LoadingSpinner from "../ui/loading-spinner";
import ErrorUi from "../ui/error-ui";
import Columns from "../column/columns";
import { DndContext } from "@dnd-kit/core";
import useBoardDragAndDrop from "@/hooks/tasks/useBoardDragAndDrop";

type BoardDetailProps = {
    board_id: string;
};

const BoardDetail = ({ board_id }: BoardDetailProps) => {
    const { data: board, isLoading, isError } = useBoard(board_id);
    const { sensors, handleDragEnd } = useBoardDragAndDrop(board_id);

    if (isLoading) {
        return (
            <div className="flex h-full min-h-screen items-center justify-center bg-[#20212C]">
                <LoadingSpinner />
            </div>
        );
    }

    if (isError || !board) {
        return (
            <div className="flex h-full min-h-screen items-center justify-center bg-[#20212C]">
                <ErrorUi errorText="Failed to load board" />
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col">
            <BoardDetailHeader boardData={board} />

            <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                <Columns board={board} />
            </DndContext>
        </div>
    );
};

export default BoardDetail;
