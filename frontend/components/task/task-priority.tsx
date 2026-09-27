import { Flag } from "lucide-react";
import { Task } from "@/libs/types/task";

type Priority = Task["priority"];

const priorityStyles: Record<Priority, string> = {
    Low: "text-emerald-400 bg-emerald-400/10",
    Medium: "text-amber-400 bg-amber-400/10",
    High: "text-red-400 bg-red-400/10",
};

type TaskPriorityProps = {
    priority: Priority;
};

const TaskPriority = ({ priority }: TaskPriorityProps) => {
    return (
        <div
            className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium ${priorityStyles[priority]}`}
        >
            <Flag size={12} />
            <span>{priority}</span>
        </div>
    );
};

export default TaskPriority;
