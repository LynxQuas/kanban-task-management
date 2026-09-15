"use client";

import { getBoard } from "@/libs/boards";
import { useQuery } from "@tanstack/react-query";
import BoardDetailHeader from "./board-detail-header";
import { Board } from "@/libs/types/board";
import ColumnHeader from "../column/column-header";
import LoadingSpinner from "../ui/loading-spinner";
import ErrorUi from "../ui/error-ui";

type BoardDetailProps = {
    board_id: string;
};

const BoardDetail = ({ board_id }: BoardDetailProps) => {
    const boardId = Number(board_id);

    const {
        data: board,
        isLoading,
        isError,
    } = useQuery<Board>({
        queryKey: ["board", boardId],
        queryFn: () => getBoard(board_id),
    });

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

    console.log(board);

    return (
        <div className="flex h-full flex-col">
            <BoardDetailHeader boardData={board} />

            <div className="min-h-0 flex-1 overflow-x-auto bg-[#20212C]">
                <div className="flex min-w-max gap-5 p-5">
                    {board.columns.map((column) => {
                        const taskCount = column.tasks?.length ?? 0;
                        return (
                            <ColumnHeader
                                key={column.id}
                                column={column}
                                taskCount={taskCount}
                                tasks={column.tasks ?? []}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default BoardDetail;
