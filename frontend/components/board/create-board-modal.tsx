"use client";

import { X, Plus, Columns3 } from "lucide-react";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBoard } from "@/libs/boards";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateBoardForm, createBoardSchema } from "@/libs/schemas/board";
import { CreateBoardInput } from "@/libs/types/board";
import ModalLayout from "../modal-layout";
import { useRouter } from "next/navigation";

type CreateBoardModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const CreateBoardModal = ({ isOpen, onClose }: CreateBoardModalProps) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const { mutate: createBoardMutation, isPending } = useMutation({
        mutationFn: createBoard,

        onSuccess: (newBoard) => {
            queryClient.invalidateQueries({
                queryKey: ["boards"],
            });

            router.push(`/board/${newBoard.id}`);

            onClose();
        },

        onError: (error) => {
            console.error(error);
        },
    });

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CreateBoardForm>({
        resolver: zodResolver(createBoardSchema),

        defaultValues: {
            name: "",

            columns: [
                {
                    id: crypto.randomUUID(),
                    name: "Todo",
                },
                {
                    id: crypto.randomUUID(),
                    name: "Doing",
                },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "columns",
    });

    const addColumn = () => {
        append({
            id: crypto.randomUUID(),
            name: "",
        });
    };

    const createNewBoardHandler = (data: CreateBoardForm) => {
        const boardData: CreateBoardInput = {
            name: data.name,

            columns: data.columns.map((column, index) => ({
                name: column.name,
                position: index,
            })),
        };

        createBoardMutation(boardData);
    };

    return (
        <ModalLayout isOpen={isOpen} onClose={onClose}>
            <form
                onSubmit={handleSubmit(createNewBoardHandler)}
                className="text-white"
            >
                {/* Header */}
                <div className="mb-7 flex items-start justify-between">
                    <div>
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/15">
                            <Columns3 size={20} className="text-indigo-400" />
                        </div>

                        <h2 className="text-xl font-semibold tracking-tight">
                            Create a new board
                        </h2>

                        <p className="mt-1 text-sm text-gray-400">
                            Organize your work with a new Kanban board.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition hover:bg-white/5 hover:text-white"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Board Name */}
                <div className="mb-6">
                    <label
                        htmlFor="board-name"
                        className="mb-2 block text-sm font-medium text-gray-300"
                    >
                        Board name
                    </label>

                    <input
                        {...register("name")}
                        id="board-name"
                        type="text"
                        placeholder="e.g. Web Design"
                        autoFocus
                        className="w-full rounded-lg border border-white/10 bg-[#20212C] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    />

                    {errors.name && (
                        <p className="mt-2 text-xs text-red-400">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <div>
                    <div className="mb-3 flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-medium text-gray-300">
                                Columns
                            </h3>

                            <p className="mt-1 text-xs text-gray-500">
                                Add the stages you use to track your work.
                            </p>
                        </div>

                        <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-gray-400">
                            {fields.length}
                        </span>
                    </div>

                    <div className="space-y-2">
                        {fields.map((field, index) => (
                            <div key={field.id}>
                                <div className="group flex items-center gap-2">
                                    {/* Position */}
                                    <div className="flex h-10 w-7 shrink-0 items-center justify-center text-xs text-gray-500">
                                        {index + 1}
                                    </div>

                                    {/* Input */}
                                    <input
                                        {...register(`columns.${index}.name`)}
                                        type="text"
                                        placeholder={`Column ${index + 1}`}
                                        className="min-w-0 flex-1 rounded-lg border border-white/10 bg-[#20212C] px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-600 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                                    />

                                    {/* Remove */}
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        disabled={fields.length === 1}
                                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-30"
                                    >
                                        <X size={17} />
                                    </button>
                                </div>

                                {errors.columns?.[index]?.name && (
                                    <p className="ml-7 mt-1 text-xs text-red-400">
                                        {errors.columns[index]?.name?.message}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    {errors.columns?.root && (
                        <p className="mt-2 text-xs text-red-400">
                            {errors.columns.root.message}
                        </p>
                    )}

                    {/* Add Column */}
                    <button
                        type="button"
                        onClick={addColumn}
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-white/10 bg-white/2 py-2.5 text-sm font-medium text-gray-400 transition hover:border-indigo-500/40 hover:bg-indigo-500/5 hover:text-indigo-400"
                    >
                        <Plus size={16} />
                        Add new column
                    </button>
                </div>

                {/* Divider */}
                <div className="my-6 border-t border-white/10" />

                {/* Actions */}
                <div className="flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg px-4 py-2.5 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isPending ? "Creating..." : "Create board"}
                    </button>
                </div>
            </form>
        </ModalLayout>
    );
};

export default CreateBoardModal;
