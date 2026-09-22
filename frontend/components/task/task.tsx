import { Task } from "@/libs/types/task";
import TaskCard from "./task-card";
import { Column } from "@/libs/types/board";

type TasksProps = {
    tasks: Task[];
    columns: Column[];
};

const Tasks = ({ tasks, columns }: TasksProps) => {
    return (
        <div className="flex h-full flex-col gap-3">
            {tasks?.map((task) => (
                <TaskCard columns={columns} key={task.id} task={task} />
            ))}
        </div>
    );
};

export default Tasks;
