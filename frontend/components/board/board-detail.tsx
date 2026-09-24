"use client";

import useBoard from "@/hooks/useBoard";
import BoardDetailHeader from "./board-detail-header";
import LoadingSpinner from "../ui/loading-spinner";
import ErrorUi from "../ui/error-ui";
import Columns from "../column/columns";

import { updateTask } from "@/libs/tasks";
import { useQueryClient } from "@tanstack/react-query";
import {
    DndContext,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core";

type BoardDetailProps = {
    board_id: string;
};

const BoardDetail = ({ board_id }: BoardDetailProps) => {
    const { data: board, isLoading, isError } = useBoard(board_id);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 200,
                tolerance: 5,
            },
        }),
    );

    const queryClient = useQueryClient();

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        if (active.id === over.id) return;

        await updateTask(Number(active.id), {
            column_id: Number(over.id),
        });

        queryClient.invalidateQueries({
            queryKey: ["board", board_id],
        });
    };

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
