"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { CreateTaskForm, createTaskSchema } from "@/libs/schemas/task";
import { Column } from "@/libs/types/board";
import { Task } from "@/libs/types/task";

import FormActions from "@/components/ui/form-actions";

import TaskModalHeader from "../task-modal-header";
import TaskStatus from "../task-status";

import TaskTitle from "./task-title";
import TaskDescription from "./task-description";
import TaskFormPriority from "./task-form-priority";
import TaskDueDate from "./task-due-date";
import useSaveTask from "@/hooks/tasks/useSaveTask";

type TaskFormProps = {
    onClose: () => void;
    columns: Column[];
    task?: Task;
};

const TaskForm = ({ onClose, columns, task }: TaskFormProps) => {
    const isEditing = Boolean(task);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateTaskForm>({
        resolver: zodResolver(createTaskSchema),

        defaultValues: {
            title: task?.title ?? "",
            description: task?.description ?? "",
            priority: task?.priority ?? "Medium",
            due_date: task?.due_date ?? "",
            column_id: task?.column_id,
        },
    });

    const {
        mutate: saveTask,
        isPending,
        isError,
        error,
    } = useSaveTask(task?.id);

    const handleSubmitTask = (data: CreateTaskForm) => {
        saveTask(data, {
            onSuccess: onClose,
        });
    };

    return (
        <form onSubmit={handleSubmit(handleSubmitTask)} className="text-white">
            <TaskModalHeader
                onClose={onClose}
                isPending={isPending}
                isEditing={isEditing}
            />

            <TaskTitle
                register={register}
                taskTitleError={errors.title?.message}
            />

            <TaskDescription
                register={register}
                taskDescriptionErrors={errors.description?.message}
            />

            <div className="mb-5 grid grid-cols-2 gap-3">
                <TaskStatus
                    register={register}
                    columnErrors={errors.column_id?.message}
                    columns={columns}
                />

                <TaskFormPriority
                    register={register}
                    priorityErrors={errors.priority?.message}
                    isPending={isPending}
                />
            </div>

            <TaskDueDate
                register={register}
                isPending={isPending}
                taskDueDateErrors={errors.due_date?.message}
            />

            <div className="border-t border-white/10" />

            {isError && (
                <p className="mt-3 text-right text-xs text-red-400">
                    {error.message}
                </p>
            )}

            <FormActions
                isPending={isPending}
                onClose={onClose}
                isEditing={isEditing}
            />
        </form>
    );
};

export default TaskForm;
