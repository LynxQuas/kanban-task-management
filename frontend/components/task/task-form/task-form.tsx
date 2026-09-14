import { CreateTaskForm, createTaskSchema } from "@/libs/schemas/task";
import { createTask } from "@/libs/tasks";
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
import FormActions from "@/components/ui/form-actions";

type TaskFormProps = {
    onClose: () => void;
    columns: Column[];
};

const TaskForm = ({ onClose, columns }: TaskFormProps) => {
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateTaskForm>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            title: "",
            description: "",
            priority: "Medium",
            due_date: "",
        },
    });

    const {
        mutate: createTaskMutation,
        isPending,
        error,
        isError,
    } = useMutation({
        mutationFn: createTask,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["board"],
            });

            reset();
            onClose();
        },
    });

    const createTaskHandler = (data: CreateTaskForm) => {
        console.log("createTaskHandler", data);
        createTaskMutation(data);
    };
    return (
        <form onSubmit={handleSubmit(createTaskHandler)} className="text-white">
            <CreateTaskHeader onClose={onClose} isPending={isPending} />

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
            <FormActions isPending={isPending} onClose={onClose} />
        </form>
    );
};

export default TaskForm;
