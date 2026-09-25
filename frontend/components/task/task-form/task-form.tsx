"use client";

import { CreateTaskForm, createTaskSchema } from "@/libs/schemas/task";
import { createTask, updateTask } from "@/libs/tasks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import CreateTaskHeader from "../create-task-header";
import TaskTitle from "./task-title";
import TaskDescription from "./task-description";
import TaskStatus from "../task-status";
import TaskPriority from "../task-priority";
import TaskDueDate from "./task-due-date";

import { Column } from "@/libs/types/board";
import { Task } from "@/libs/types/task";
import FormActions from "@/components/ui/form-actions";

type TaskFormProps = {
    onClose: () => void;
    columns: Column[];
    task?: Task;
};

const TaskForm = ({ onClose, columns, task }: TaskFormProps) => {
    const queryClient = useQueryClient();

    const isEditing = !!task;

    const {
        register,
        handleSubmit,
        reset,
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
        mutate: saveTaskMutation,
        isPending,
        error,
        isError,
    } = useMutation({
        mutationFn: (data: CreateTaskForm) => {
            if (isEditing) {
                return updateTask(task.id, data);
            }

            return createTask(data);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["board"],
            });
            queryClient.invalidateQueries({
                queryKey: ["task"],
            });

            reset();
            onClose();
        },
    });

    const taskSubmitHandler = (data: CreateTaskForm) => {
        saveTaskMutation(data);
    };

    return (
        <form onSubmit={handleSubmit(taskSubmitHandler)} className="text-white">
            <CreateTaskHeader
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

                <TaskPriority
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
