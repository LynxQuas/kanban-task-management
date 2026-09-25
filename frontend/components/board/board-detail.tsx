"use client";

import useBoard from "@/hooks/useBoard";
import BoardDetailHeader from "./board-detail-header";
import LoadingSpinner from "../ui/loading-spinner";
import ErrorUi from "../ui/error-ui";
import Columns from "../column/columns";

import { updateTask } from "@/libs/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

    const queryClient = useQueryClient();

    const updateTaskMutation = useMutation({
        mutationFn: ({
            taskId,
            columnId,
        }: {
            taskId: number;
            columnId: number;
        }) =>
            updateTask(taskId, {
                column_id: columnId,
            }),

        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["board", board_id],
            });

            queryClient.invalidateQueries({
                queryKey: ["task", variables.taskId],
            });
        },
    });

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

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        updateTaskMutation.mutate({
            taskId: Number(active.id),
            columnId: Number(over.id),
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
