import { useToast } from "@/context/toast-context";
import { deleteTask } from "@/libs/tasks";

import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteTask = () => {
    const queryClient = useQueryClient();
    const { showToast } = useToast();

    return useMutation({
        mutationFn: deleteTask,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["board"],
            });

            showToast("Task deleted successfully.");
        },

        onError: () => {
            showToast("Failed to delete task.", "error");
        },
    });
};

export default useDeleteTask;
