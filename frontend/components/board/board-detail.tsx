"use client";

import { getBoard } from "@/libs/boards";
import { useQuery } from "@tanstack/react-query";
import BoardDetailHeader from "./board-detail-header";
import { Board } from "@/libs/types/board";
import ColumnHeader from "../column/column-header";

type BoardDetailProps = {
    board_id: string;
};

const BoardDetail = ({ board_id }: BoardDetailProps) => {
    const {
        data: board,
        isLoading,
        isError,
    } = useQuery<Board>({
        queryKey: ["board", board_id],
        queryFn: () => getBoard(board_id),
    });

    if (isLoading) {
        return <div className="p-6 text-white">Loading...</div>;
    }

    if (isError || !board) {
        return <div className="p-6 text-white">Failed to load board.</div>;
    }

    console.log(board);

    return (
        <div className="flex h-full flex-col">
            <BoardDetailHeader
                board_name={board.name}
                columns={board.columns}
            />

            <div className="min-h-0 flex-1 overflow-x-auto bg-[#20212C]">
                <div className="flex h-full min-w-max gap-5 p-5">
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
