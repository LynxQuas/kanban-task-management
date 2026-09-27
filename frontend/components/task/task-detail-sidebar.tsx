"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import useTask from "@/hooks/useTask";
import useBoard from "@/hooks/useBoard";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useEscapeKey } from "@/hooks/useEscapeKey";

import DeleteConfirmationModal from "../delete-confirmation-modal";
import TaskModal from "./task-modal";
import DropDownActions from "../ui/drop-down-actions";
import useDeleteTask from "@/hooks/tasks/useDeleteTask";
import TaskDetailHeader from "./task-detail-header";
import TaskDetailContent from "./task-detail-content";

type TaskDetailSidebarProps = {
    board_id: string;
    task_id: string;
};

const TaskDetailSidebar = ({ board_id, task_id }: TaskDetailSidebarProps) => {
    const router = useRouter();
    const sidebarRef = useRef<HTMLElement>(null);

    const taskId = Number(task_id);

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const {
        data: task,
        isLoading: isTaskLoading,
        isError: isTaskError,
    } = useTask(taskId);

    const {
        data: board,
        isLoading: isBoardLoading,
        isError: isBoardError,
    } = useBoard(board_id);

    const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();

    const handleClose = () => {
        router.back();
    };

    const handleDelete = () => {
        deleteTask(taskId, {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                router.back();
            },
        });
    };

    useClickOutside(sidebarRef, () => {
        if (!isTaskModalOpen && !isDeleteModalOpen) {
            handleClose();
        }
    });

    useEscapeKey(handleClose);

    const isLoading = isTaskLoading || isBoardLoading;
    const isError = isTaskError || isBoardError;

    if (isLoading) {
        return (
            <TaskDetailSidebarLayout ref={sidebarRef}>
                <TaskDetailHeader onClose={handleClose} />
                <SidebarLoading />
            </TaskDetailSidebarLayout>
        );
    }

    if (isError || !task || !board) {
        return (
            <TaskDetailSidebarLayout ref={sidebarRef}>
                <TaskDetailHeader onClose={handleClose} />
                <SidebarError />
            </TaskDetailSidebarLayout>
        );
    }

    const column = board.columns.find((column) => column.id === task.column_id);

    return (
        <>
            <TaskModal
                columns={board.columns}
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

            <TaskDetailSidebarLayout ref={sidebarRef}>
                <TaskDetailHeader
                    onClose={handleClose}
                    actions={
                        <DropDownActions
                            handleEdit={() => setIsTaskModalOpen(true)}
                            handleDelete={() => setIsDeleteModalOpen(true)}
                            label="task"
                            className="h-9 w-9 border-white/5 p-1 text-gray-500 hover:bg-white/6 hover:text-gray-200"
                            iconSize={17}
                        />
                    }
                />

                <TaskDetailContent
                    task={task}
                    columnName={column?.name ?? "Unknown"}
                />
            </TaskDetailSidebarLayout>
        </>
    );
};

type TaskDetailSidebarLayoutProps = {
    children: React.ReactNode;
};

const TaskDetailSidebarLayout = ({
    children,
    ...props
}: TaskDetailSidebarLayoutProps & React.ComponentProps<"aside">) => {
    return (
        <aside
            {...props}
            className="fixed inset-y-0 right-0 z-20 flex w-full animate-[slideIn_220ms_cubic-bezier(0.16,1,0.3,1)] flex-col border-l border-white/8 bg-[#20212C] shadow-[-24px_0_70px_rgba(0,0,0,0.35)] md:w-110"
        >
            {children}
        </aside>
    );
};

const SidebarLoading = () => {
    return (
        <div className="flex flex-1 items-center justify-center">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/10 border-t-indigo-400" />
        </div>
    );
};

const SidebarError = () => {
    return (
        <div className="flex flex-1 items-center justify-center px-6">
            <div className="text-center">
                <p className="text-sm font-medium text-gray-300">
                    Failed to load task
                </p>

                <p className="mt-1 text-xs text-gray-500">Please try again.</p>
            </div>
        </div>
    );
};

export default TaskDetailSidebar;
