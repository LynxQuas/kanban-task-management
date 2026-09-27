import { CalendarDays, Flag, Layers3 } from "lucide-react";

import { Task } from "@/libs/types/task";
import TaskDetailBadge from "./task-detail-badge";

type TaskDetailContentProps = {
    task: Task;
    columnName: string;
};

const priorityStyles: Record<
    Task["priority"],
    {
        container: string;
        text: string;
        dot: string;
    }
> = {
    Low: {
        container: "border-emerald-400/15 bg-emerald-400/8",
        text: "text-emerald-400",
        dot: "bg-emerald-400",
    },
    Medium: {
        container: "border-amber-400/15 bg-amber-400/8",
        text: "text-amber-400",
        dot: "bg-amber-400",
    },
    High: {
        container: "border-red-400/15 bg-red-400/8",
        text: "text-red-400",
        dot: "bg-red-400",
    },
};

const TaskDetailContent = ({ task, columnName }: TaskDetailContentProps) => {
    const priority = priorityStyles[task.priority];

    return (
        <div className="flex-1 overflow-y-auto">
            <div className="border-b border-white/6 px-6 py-7">
                <div className="mb-3 flex items-center gap-2">
                    <span className="rounded-md bg-white/5 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-gray-500">
                        Task
                    </span>

                    <span className="text-xs text-gray-600">#{task.id}</span>
                </div>

                <h1 className="wrap-break-word text-xl font-semibold leading-7 tracking-tight text-white">
                    {task.title}
                </h1>

                <div className="mt-6 flex flex-wrap gap-2">
                    <TaskDetailBadge
                        className={`${priority.container} ${priority.text}`}
                    >
                        <span
                            className={`h-1.5 w-1.5 rounded-full ${priority.dot}`}
                        />

                        <Flag size={13} />

                        {task.priority}
                    </TaskDetailBadge>

                    <TaskDetailBadge className="border-indigo-400/15 bg-indigo-400/8 text-indigo-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />

                        <Layers3 size={13} />

                        {columnName}
                    </TaskDetailBadge>

                    <TaskDetailBadge
                        className={
                            task.due_date
                                ? "border-orange-400/15 bg-orange-400/8 text-orange-400"
                                : "border-white/6 bg-white/5 text-gray-500"
                        }
                    >
                        <CalendarDays size={13} />

                        {task.due_date
                            ? new Date(task.due_date).toLocaleDateString()
                            : "No due date"}
                    </TaskDetailBadge>
                </div>
            </div>

            <div className="space-y-8 px-6 py-7">
                <section>
                    <SectionTitle>Description</SectionTitle>

                    <div className="mt-3 rounded-2xl border border-white/6 bg-[#282934] p-5">
                        <p className="whitespace-pre-wrap wrap-break-word text-sm leading-6 text-gray-300">
                            {task.description || "No description added."}
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
};

const SectionTitle = ({ children }: { children: React.ReactNode }) => {
    return (
        <h2 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gray-600">
            {children}
        </h2>
    );
};

export default TaskDetailContent;
