import { deleteTask } from "@/libs/tasks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteTask,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["board"],
            });
        },
    });
};

export default useDeleteTask;
