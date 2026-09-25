"use client";

import { deleteTask } from "@/libs/tasks";
import { Task } from "@/libs/types/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    CalendarDays,
    Flag,
    GripVertical,
    Trash2,
    TriangleAlert,
} from "lucide-react";
import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";

import DropDownActions from "../ui/drop-down-actions";
import ModalLayout from "../modal-layout";
import TaskModal from "./task-modal";
import { Column } from "@/libs/types/board";
import { useRouter } from "next/navigation";

type Priority = "Low" | "Medium" | "High";

const priorityStyles: Record<Priority, string> = {
    Low: "text-emerald-400 bg-emerald-400/10",
    Medium: "text-amber-400 bg-amber-400/10",
    High: "text-red-400 bg-red-400/10",
};

type TaskCardProps = {
    task: Task;
    columns: Column[];
    board_id: number;
};

const TaskCard = ({ task, columns, board_id }: TaskCardProps) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({
            id: task.id,
        });

    const deleteTaskMutation = useMutation({
        mutationFn: () => deleteTask(task.id),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["board"],
            });

            setIsDeleteModalOpen(false);
        },
    });

    const handleTaskClick = () => {
        const currentPath = window.location.pathname;

        const isTaskDetailOpen = currentPath.includes("/tasks/");

        if (isTaskDetailOpen) {
            router.replace(`/boards/${board_id}/tasks/${task.id}`);
        } else {
            router.push(`/boards/${board_id}/tasks/${task.id}`);
        }
    };

    const handleEditTask = () => {
        setIsTaskModalOpen(true);
    };

    const handleDeleteTask = () => {
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        deleteTaskMutation.mutate();
    };

    const { isPending } = deleteTaskMutation;

    return (
        <>
            <TaskModal
                columns={columns}
                task={task}
                isOpen={isTaskModalOpen}
                onClose={() => setIsTaskModalOpen(false)}
            />

            <ModalLayout
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    if (!isPending) {
                        setIsDeleteModalOpen(false);
                    }
                }}
            >
                <div className="flex flex-col">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-red-400/10">
                        <TriangleAlert size={21} className="text-red-400" />
                    </div>

                    <h2 className="text-lg font-semibold text-white">
                        Delete task?
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-400">
                        Are you sure you want to delete{" "}
                        <span className="font-medium text-gray-200">
                            &quot;{task.title}&quot;
                        </span>
                        ? This action cannot be undone.
                    </p>

                    <div className="mt-6 flex justify-end gap-2">
                        <button
                            type="button"
                            disabled={isPending}
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            disabled={isPending}
                            onClick={handleConfirmDelete}
                            className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Trash2 size={15} />

                            {isPending ? "Deleting..." : "Delete task"}
                        </button>
                    </div>
                </div>
            </ModalLayout>

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
                            className={`mt-0.5 shrink-0 text-gray-600 transition group-hover:text-indigo-400 cursor-grab ${
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
                            handleEdit={handleEditTask}
                            handleDelete={handleDeleteTask}
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
        </>
    );
};

export default TaskCard;
