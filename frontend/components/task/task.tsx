import { Task } from "@/libs/types/task";
import TaskCard from "./task-card";

type TasksProps = {
    tasks: Task[];
};

const Tasks = ({ tasks }: TasksProps) => {
    return (
        <div className="flex flex-col gap-3">
            {tasks?.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
};

export default Tasks;
