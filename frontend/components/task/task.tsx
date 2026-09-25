import { Task } from "@/libs/types/task";
import TaskCard from "./task-card";
import { Board, Column } from "@/libs/types/board";

type TasksProps = {
    tasks: Task[];
    columns: Column[];
    board: Board;
};

const Tasks = ({ tasks, columns, board }: TasksProps) => {
    return (
        <div className="flex h-full flex-col gap-3">
            {tasks?.map((task) => (
                <TaskCard
                    board_id={board.id}
                    columns={columns}
                    key={task.id}
                    task={task}
                />
            ))}
        </div>
    );
};

export default Tasks;
