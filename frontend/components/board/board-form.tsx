"use client";
import { createBoard } from "@/libs/boards";
import { CreateBoardForm, createBoardSchema } from "@/libs/schemas/board";
import { CreateBoardInput } from "@/libs/types/board";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Columns3, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import BoardColumnFields from "./board-column-fields";

type BoardFormProps = {
    onClose: () => void;
};

const BoardForm = ({ onClose }: BoardFormProps) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const { mutate: createBoardMutation, isPending } = useMutation({
        mutationFn: createBoard,

        onSuccess: (newBoard) => {
            queryClient.invalidateQueries({
                queryKey: ["boards"],
            });

            router.push(`/boards/${newBoard.id}`);

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

            <BoardColumnFields
                control={control}
                register={register}
                errors={errors}
            />

            <div className="my-6 border-t border-white/10" />

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
    );
};

export default BoardForm;
