"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDraggable } from "@dnd-kit/core";
import { CalendarDays, GripVertical } from "lucide-react";

import { Task } from "@/libs/types/task";
import { Column } from "@/libs/types/board";

import DropDownActions from "../ui/drop-down-actions";
import DeleteConfirmationModal from "../delete-confirmation-modal";

import TaskModal from "./task-modal";
import TaskPriority from "./task-priority";
import useDeleteTask from "@/hooks/tasks/useDeleteTask";

type TaskCardProps = {
    task: Task;
    columns: Column[];
    board_id: number;
};

const TaskCard = ({ task, columns, board_id }: TaskCardProps) => {
    const router = useRouter();

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();

    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({
            id: task.id,
        });

    const handleTaskClick = () => {
        const taskPath = `/boards/${board_id}/tasks/${task.id}`;

        if (window.location.pathname.includes("/tasks/")) {
            router.replace(taskPath);
            return;
        }

        router.push(taskPath);
    };

    const handleDelete = () => {
        deleteTask(task.id, {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
            },
        });
    };

    return (
        <>
            <TaskModal
                columns={columns}
                task={task}
                isOpen={isTaskModalOpen}
                onClose={() => setIsTaskModalOpen(false)}
            />

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                isPending={isDeleting}
                title="Delete task?"
                description={
                    <>
                        Are you sure you want to delete{" "}
                        <span className="font-medium text-gray-200">
                            &quot;{task.title}&quot;
                        </span>
                        ? This action cannot be undone.
                    </>
                }
                confirmLabel="Delete task"
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
            />

            <article
                ref={setNodeRef}
                onClick={handleTaskClick}
                style={{
                    transform: transform
                        ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
                        : undefined,
                }}
                className={`group cursor-pointer rounded-xl border border-white/5 bg-[#2B2C37] p-4 shadow-sm ${
                    isDragging
                        ? "z-50 shadow-xl"
                        : "transition-all duration-200 hover:-translate-y-0.5 hover:border-white/10 hover:bg-[#30313D] hover:shadow-lg"
                }`}
            >
                <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-2">
                        <button
                            type="button"
                            {...listeners}
                            {...attributes}
                            onClick={(event) => event.stopPropagation()}
                            aria-label="Drag task"
                            className={`mt-0.5 shrink-0 cursor-grab text-gray-600 transition group-hover:text-indigo-400 ${
                                isDragging ? "cursor-grabbing" : ""
                            }`}
                        >
                            <GripVertical size={20} />
                        </button>

                        <h3 className="text-sm font-medium leading-5 text-gray-100">
                            {task.title}
                        </h3>
                    </div>

                    <div onClick={(event) => event.stopPropagation()}>
                        <DropDownActions
                            handleEdit={() => setIsTaskModalOpen(true)}
                            handleDelete={() => setIsDeleteModalOpen(true)}
                            label="task"
                            className="h-7 w-7 shrink-0 rounded-md p-1 text-gray-600 opacity-0 transition hover:bg-white/5 hover:text-gray-300 group-hover:opacity-100"
                        />
                    </div>
                </div>

                {task.description && (
                    <p className="mt-3 line-clamp-2 text-xs leading-5 text-gray-500">
                        {task.description}
                    </p>
                )}

                <div className="my-4 border-t border-white/5" />

                <div className="flex flex-wrap items-center gap-2">
                    <TaskPriority priority={task.priority} />

                    {task.due_date && (
                        <div className="ml-auto flex items-center gap-1.5 text-[11px] text-gray-500">
                            <CalendarDays size={12} />
                            <span>{task.due_date}</span>
                        </div>
                    )}
                </div>
            </article>
        </>
    );
};

export default TaskCard;
