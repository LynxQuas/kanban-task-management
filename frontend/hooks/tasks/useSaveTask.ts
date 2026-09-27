import { createTask, updateTask } from "@/libs/tasks";
import { CreateTaskForm } from "@/libs/schemas/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useSaveTask = (taskId?: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateTaskForm) => {
            if (taskId) {
                return updateTask(taskId, data);
            }

            return createTask(data);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["board"],
            });

            if (taskId) {
                queryClient.invalidateQueries({
                    queryKey: ["task", taskId],
                });
            }
        },
    });
};

export default useSaveTask;
