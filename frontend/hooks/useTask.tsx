import { getTask } from "@/libs/tasks";
import { useQuery } from "@tanstack/react-query";

const useTask = (taskId: number) => {
    return useQuery({
        queryKey: ["task", taskId],
        queryFn: () => getTask(taskId),
        enabled: !!taskId,
    });
};

export default useTask;
