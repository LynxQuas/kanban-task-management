import { updateTask } from "@/libs/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type MoveTaskParams = {
    taskId: number;
    columnId: number;
};

const useMoveTask = (board_id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ taskId, columnId }: MoveTaskParams) =>
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
};

export default useMoveTask;
