"use client";

import { CalendarDays, Check, ChevronDown, Flag, Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import ModalLayout from "../modal-layout";

import { CreateTaskForm, createTaskSchema } from "@/libs/schemas/task";

import { createTask } from "@/libs/tasks";
import { Column } from "@/libs/types/board";

type CreateTaskModalProps = {
    isOpen: boolean;
    onClose: () => void;
    columns: Column[];
};

const CreateTaskModal = ({
    isOpen,
    onClose,
    columns,
}: CreateTaskModalProps) => {
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
        createTaskMutation(data);
    };

    return (
        <ModalLayout isOpen={isOpen} onClose={onClose}>
            <form
                onSubmit={handleSubmit(createTaskHandler)}
                className="text-white"
            >
                <div className="mb-7 flex items-start justify-between">
                    <div>
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/15">
                            <Plus size={20} className="text-indigo-400" />
                        </div>

                        <h2 className="text-xl font-semibold tracking-tight">
                            Create a new task
                        </h2>

                        <p className="mt-1 text-sm text-gray-400">
                            Add a task and keep your work moving forward.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isPending}
                        className=" flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 "
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="task-title"
                        className="mb-2 block text-sm font-medium text-gray-300"
                    >
                        Task title
                    </label>

                    <input
                        {...register("title")}
                        id="task-title"
                        type="text"
                        placeholder="e.g. Design login page"
                        autoFocus
                        className=" w-full rounded-lg border border-white/10 bg-[#20212C] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                        "
                    />

                    {errors.title && (
                        <p className="mt-2 text-xs text-red-400">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                <div className="mb-5">
                    <label
                        htmlFor="task-description"
                        className="mb-2 block text-sm font-medium text-gray-300"
                    >
                        Description
                    </label>

                    <textarea
                        {...register("description")}
                        id="task-description"
                        rows={4}
                        placeholder="Add some details about this task..."
                        className=" w-full resize-none rounded-lg border border-white/10 bg-[#20212C] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                        "
                    />

                    {errors.description && (
                        <p className="mt-2 text-xs text-red-400">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                <div className="mb-5 grid grid-cols-2 gap-3">
                    <div>
                        <label
                            htmlFor="task-column"
                            className="mb-2 block text-sm font-medium text-gray-300"
                        >
                            Status
                        </label>

                        <div className="relative">
                            <select
                                {...register("column_id", {
                                    valueAsNumber: true,
                                })}
                                id="task-column"
                                className=" w-full appearance-none rounded-lg border border-white/10 bg-[#20212C] px-3 py-2.5 pr-9 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 "
                            >
                                {columns.map((column) => (
                                    <option key={column.id} value={column.id}>
                                        {column.name}
                                    </option>
                                ))}
                            </select>

                            <ChevronDown
                                size={16}
                                className="
                                    pointer-events-none absolute
                                    right-3 top-1/2
                                    -translate-y-1/2 text-gray-500
                                "
                            />
                        </div>

                        {errors.column_id && (
                            <p className="mt-2 text-xs text-red-400">
                                {errors.column_id.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="task-priority"
                            className="mb-2 block text-sm font-medium text-gray-300"
                        >
                            Priority
                        </label>

                        <div className="relative">
                            <Flag
                                size={15}
                                className="
                                    pointer-events-none absolute
                                    left-3 top-1/2
                                    -translate-y-1/2 text-gray-500
                                "
                            />

                            <select
                                {...register("priority")}
                                id="task-priority"
                                disabled={isPending}
                                className="
                                    w-full appearance-none rounded-lg
                                    border border-white/10 bg-[#20212C]
                                    py-2.5 pl-9 pr-9 text-sm text-white
                                    outline-none transition
                                    focus:border-indigo-500
                                    focus:ring-2 focus:ring-indigo-500/20
                                "
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>

                            <ChevronDown
                                size={16}
                                className="
                                    pointer-events-none absolute
                                    right-3 top-1/2
                                    -translate-y-1/2 text-gray-500
                                "
                            />
                        </div>

                        {errors.priority && (
                            <p className="mt-2 text-xs text-red-400">
                                {errors.priority.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Due Date */}
                <div className="mb-6">
                    <label
                        htmlFor="task-due-date"
                        className="mb-2 block text-sm font-medium text-gray-300"
                    >
                        Due date
                    </label>

                    <div className="relative">
                        <CalendarDays
                            size={16}
                            className="
                                pointer-events-none absolute
                                left-3 top-1/2
                                -translate-y-1/2 text-gray-500
                            "
                        />

                        <input
                            {...register("due_date")}
                            id="task-due-date"
                            type="date"
                            disabled={isPending}
                            className="
                                w-full rounded-lg
                                border border-white/10 bg-[#20212C]
                                py-2.5 pl-9 pr-3 text-sm text-white
                                outline-none transition
                                focus:border-indigo-500
                                focus:ring-2 focus:ring-indigo-500/20
                            "
                        />
                    </div>

                    {errors.due_date && (
                        <p className="mt-2 text-xs text-red-400">
                            {errors.due_date.message}
                        </p>
                    )}
                </div>

                <div className="border-t border-white/10" />

                {isError && (
                    <p className="mt-3 text-right text-xs text-red-400">
                        {error.message}
                    </p>
                )}

                {/* Actions */}
                <div className="mt-5 flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isPending}
                        className="
                            rounded-lg px-4 py-2.5 text-sm
                            font-medium text-gray-400 transition
                            hover:bg-white/5 hover:text-white
                        "
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="
                            flex items-center gap-2 rounded-lg
                            bg-indigo-600 px-5 py-2.5 text-sm
                            font-medium text-white shadow-lg
                            shadow-indigo-600/20 transition
                            hover:bg-indigo-500
                            active:scale-[0.98]
                            disabled:cursor-not-allowed
                            disabled:opacity-50
                        "
                    >
                        <Check size={16} />

                        {isPending ? "Creating..." : "Create task"}
                    </button>
                </div>
            </form>
        </ModalLayout>
    );
};

export default CreateTaskModal;
