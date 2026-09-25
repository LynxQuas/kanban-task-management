"use client";

import {
    CalendarDays,
    Flag,
    Hash,
    Layers3,
    X,
    Trash2,
    TriangleAlert,
} from "lucide-react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useTask from "@/hooks/useTask";
import useBoard from "@/hooks/useBoard";
import { useClickOutside } from "@/hooks/useClickOutside";
import { deleteTask } from "@/libs/tasks";
import DropDownActions from "./ui/drop-down-actions";
import ModalLayout from "./modal-layout";
import TaskModal from "./task/task-modal";
import { useEscapeKey } from "@/hooks/useEscapeKey";

type TaskDetailSidebarProps = {
    board_id: string;
    task_id: string;
};

const priorityStyles = {
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

const TaskDetailSidebar = ({ board_id, task_id }: TaskDetailSidebarProps) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const sidebarRef = useRef<HTMLElement>(null);

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const {
        data: task,
        isLoading: isTaskLoading,
        isError: isTaskError,
    } = useTask(Number(task_id));

    const {
        data: board,
        isLoading: isBoardLoading,
        isError: isBoardError,
    } = useBoard(board_id);

    const deleteTaskMutation = useMutation({
        mutationFn: () => deleteTask(Number(task_id)),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["board"],
            });

            queryClient.invalidateQueries({
                queryKey: ["task", Number(task_id)],
            });

            setIsDeleteModalOpen(false);
            router.back();
        },
    });

    const handleClose = () => {
        router.back();
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

    useClickOutside(sidebarRef, () => {
        if (!isTaskModalOpen && !isDeleteModalOpen) {
            handleClose();
        }
    });

    useEscapeKey(handleClose);

    const isLoading = isTaskLoading || isBoardLoading;
    const isError = isTaskError || isBoardError;
    const isPending = deleteTaskMutation.isPending;

    if (isLoading) {
        return (
            <aside
                ref={sidebarRef}
                className="fixed inset-y-0 right-0 z-50 flex w-110 animate-[slideIn_220ms_ease-out] flex-col border-l border-white/8 bg-[#20212C] shadow-[-20px_0_60px_rgba(0,0,0,0.3)]"
            >
                <SidebarHeader onClose={handleClose} />

                <div className="flex flex-1 items-center justify-center">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/10 border-t-indigo-400" />
                </div>
            </aside>
        );
    }

    if (isError || !task || !board) {
        return (
            <aside
                ref={sidebarRef}
                className="fixed inset-y-0 right-0 z-50 flex w-110 animate-[slideIn_220ms_ease-out] flex-col border-l border-white/8 bg-[#20212C] shadow-[-20px_0_60px_rgba(0,0,0,0.3)]"
            >
                <SidebarHeader onClose={handleClose} />

                <div className="flex flex-1 items-center justify-center px-6">
                    <div className="text-center">
                        <p className="text-sm font-medium text-gray-300">
                            Failed to load task
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                            Please try again.
                        </p>
                    </div>
                </div>
            </aside>
        );
    }

    const priority = priorityStyles[task.priority];

    const column = board.columns.find((column) => column.id === task.column_id);

    return (
        <>
            <div onMouseDown={(event) => event.stopPropagation()}>
                <TaskModal
                    columns={board.columns}
                    task={task}
                    isOpen={isTaskModalOpen}
                    onClose={() => setIsTaskModalOpen(false)}
                />
            </div>

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

            <aside
                ref={sidebarRef}
                className="fixed inset-y-0 right-0 z-20 flex w-full md:w-110 animate-[slideIn_220ms_cubic-bezier(0.16,1,0.3,1)] flex-col border-l border-white/8 bg-[#20212C] shadow-[-24px_0_70px_rgba(0,0,0,0.35)]"
            >
                <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/6 px-5">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.6)]" />

                        <span className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">
                            Task details
                        </span>
                    </div>

                    <div className="flex items-center gap-1">
                        <DropDownActions
                            handleEdit={handleEditTask}
                            handleDelete={handleDeleteTask}
                            label="task"
                            className="h-9 w-9 border-white/5 p-1 text-gray-500 hover:bg-white/6 hover:text-gray-200"
                            iconSize={17}
                        />

                        <button
                            type="button"
                            onClick={handleClose}
                            className="rounded-xl border border-white/5 p-2 text-gray-500 transition hover:border-white/10 hover:bg-white/6 hover:text-gray-200"
                            aria-label="Close task details"
                        >
                            <X size={17} />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="border-b border-white/6 px-6 py-7">
                        <div>
                            <div className="mb-3 flex items-center gap-2">
                                <span className="rounded-md bg-white/5 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-gray-500">
                                    Task
                                </span>

                                <span className="text-xs text-gray-600">
                                    #{task.id}
                                </span>
                            </div>

                            <h1 className="wrap-break-word text-xl font-semibold leading-7 tracking-tight text-white">
                                {task.title}
                            </h1>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-2">
                            <Badge
                                className={`${priority.container} ${priority.text}`}
                            >
                                <span
                                    className={`h-1.5 w-1.5 rounded-full ${priority.dot}`}
                                />

                                <Flag size={13} />

                                {task.priority}
                            </Badge>

                            <Badge className="border-indigo-400/15 bg-indigo-400/8 text-indigo-400">
                                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />

                                <Layers3 size={13} />

                                {column?.name ?? "Unknown"}
                            </Badge>
                        </div>
                    </div>

                    <div className="space-y-8 px-6 py-7">
                        <section>
                            <SectionTitle>Description</SectionTitle>

                            <div className="mt-3 rounded-2xl border border-white/6 bg-[#282934] p-5">
                                <p className="whitespace-pre-wrap wrap-break-word text-sm leading-6 text-gray-300">
                                    {task.description ||
                                        "No description added."}
                                </p>
                            </div>
                        </section>

                        <section>
                            <SectionTitle>Details</SectionTitle>

                            <div className="mt-3 overflow-hidden rounded-2xl border border-white/6 bg-[#282934]">
                                <DetailRow
                                    icon={<Layers3 size={15} />}
                                    label="Column"
                                    value={column?.name ?? "Unknown"}
                                />

                                <DetailRow
                                    icon={<Flag size={15} />}
                                    label="Priority"
                                    value={task.priority}
                                    valueClassName={priority.text}
                                />

                                <DetailRow
                                    icon={<CalendarDays size={15} />}
                                    label="Due date"
                                    value={task.due_date || "No due date"}
                                />

                                <DetailRow
                                    icon={<Hash size={15} />}
                                    label="Task ID"
                                    value={`#${task.id}`}
                                    last
                                />
                            </div>
                        </section>
                    </div>
                </div>
            </aside>
        </>
    );
};

type SidebarHeaderProps = {
    onClose: () => void;
};

const SidebarHeader = ({ onClose }: SidebarHeaderProps) => {
    return (
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/6 px-5">
            <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.6)]" />

                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">
                    Task details
                </span>
            </div>

            <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-white/5 p-2 text-gray-500 transition hover:border-white/10 hover:bg-white/6 hover:text-gray-200"
                aria-label="Close task details"
            >
                <X size={17} />
            </button>
        </div>
    );
};

const Badge = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium ${className}`}
        >
            {children}
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

type DetailRowProps = {
    icon: React.ReactNode;
    label: string;
    value: string;
    valueClassName?: string;
    last?: boolean;
};

const DetailRow = ({
    icon,
    label,
    value,
    valueClassName = "text-gray-200",
    last = false,
}: DetailRowProps) => {
    return (
        <div
            className={`flex items-center justify-between gap-4 px-4 py-4 ${
                !last ? "border-b border-white/5" : ""
            }`}
        >
            <div className="flex min-w-0 items-center gap-3">
                <span className="shrink-0 text-gray-600">{icon}</span>

                <span className="text-xs text-gray-500">{label}</span>
            </div>

            <span className={`truncate text-xs font-medium ${valueClassName}`}>
                {value}
            </span>
        </div>
    );
};

export default TaskDetailSidebar;
