import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateTask } from "@/libs/tasks";
import { Board } from "@/libs/types/board";
import { Task } from "@/libs/types/task";

type MoveTaskParams = {
    taskId: number;
    columnId: number;
};

type MoveTaskContext = {
    previousBoard?: Board;
};

const useMoveTask = (boardId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ taskId, columnId }: MoveTaskParams) =>
            updateTask(taskId, {
                column_id: columnId,
            }),

        onMutate: async ({ taskId, columnId }): Promise<MoveTaskContext> => {
            await queryClient.cancelQueries({
                queryKey: ["board", boardId],
            });

            const previousBoard = queryClient.getQueryData<Board>([
                "board",
                boardId,
            ]);

            queryClient.setQueryData<Board>(
                ["board", boardId],
                (currentBoard) => {
                    if (!currentBoard) {
                        return currentBoard;
                    }

                    let movedTask: Task | null = null;

                    const columns = currentBoard.columns.map((column) => {
                        const task = column.tasks?.find(
                            (task) => task.id === taskId,
                        );

                        if (task) {
                            movedTask = task;
                        }

                        return {
                            ...column,
                            tasks:
                                column.tasks?.filter(
                                    (task) => task.id !== taskId,
                                ) ?? [],
                        };
                    });

                    if (!movedTask) {
                        return currentBoard;
                    }

                    const taskToMove = movedTask;

                    return {
                        ...currentBoard,
                        columns: columns.map((column) => {
                            if (column.id !== columnId) {
                                return column;
                            }

                            return {
                                ...column,
                                tasks: [...(column.tasks ?? []), taskToMove],
                            };
                        }),
                    };
                },
            );

            return {
                previousBoard,
            };
        },

        onError: (_error, _variables, context) => {
            if (context?.previousBoard) {
                queryClient.setQueryData(
                    ["board", boardId],
                    context.previousBoard,
                );
            }
        },

        onSettled: (_data, _error, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["board", boardId],
            });

            queryClient.invalidateQueries({
                queryKey: ["task", variables.taskId],
            });
        },
    });
};

export default useMoveTask;
