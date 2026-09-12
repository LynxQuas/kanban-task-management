"use client";
import { Task } from "@/libs/types/task";
import { CalendarDays, Circle, EllipsisVertical, Flag } from "lucide-react";

type Priority = "Low" | "Medium" | "High";

const priorityStyles: Record<Priority, string> = {
    Low: "text-emerald-400 bg-emerald-400/10",
    Medium: "text-amber-400 bg-amber-400/10",
    High: "text-red-400 bg-red-400/10",
};

type TaskCardProps = {
    task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
    return (
        <article className=" group rounded-xl border border-white/5 bg-[#2B2C37] p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/10 hover:bg-[#30313D] hover:shadow-lg ">
            <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-2">
                    <Circle
                        size={17}
                        className="mt-0.5 shrink-0 text-gray-600 transition group-hover:text-indigo-400"
                    />

                    <h3 className="text-sm font-medium leading-5 text-gray-100">
                        {task.title}
                    </h3>
                </div>

                <button
                    type="button"
                    className="shrink-0 rounded-md p-1 text-gray-600 opacity-0 transition hover:bg-white/5 hover:text-gray-300 group-hover:opacity-100 "
                >
                    <EllipsisVertical size={16} />
                </button>
            </div>

            {task.description && (
                <p className="mt-3 line-clamp-2 text-xs leading-5 text-gray-500">
                    {task.description}
                </p>
            )}

            <div className="my-4 border-t border-white/5" />

            <div className="flex flex-wrap items-center gap-2">
                <div
                    className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium ${priorityStyles[task.priority]}`}
                >
                    <Flag size={12} />
                    <span>{task.priority}</span>
                </div>

                {task.due_date && (
                    <div className="ml-auto flex items-center gap-1.5 text-[11px] text-gray-500">
                        <CalendarDays size={12} />

                        <span>{task.due_date}</span>
                    </div>
                )}
            </div>
        </article>
    );
};

export default TaskCard;
