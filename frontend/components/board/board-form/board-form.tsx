"use client";
import { createBoard, updateBoard } from "@/libs/boards";
import { CreateBoardForm, createBoardSchema } from "@/libs/schemas/board";
import { Board, CreateBoardInput } from "@/libs/types/board";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import BoardColumnFields from "./board-column-fields";
import FormActions from "../../ui/form-actions";
import BoardFormHeader from "./board-form-header";
import BoardFormName from "./board-form-name";

type BoardFormProps = {
    onClose: () => void;
    boardData?: Board;
};

const BoardForm = ({ onClose, boardData }: BoardFormProps) => {
    const isEditing = !!boardData;

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

    const { mutate: updateBoardMutation, isPending: isUpdating } = useMutation({
        mutationFn: updateBoard,

        onSuccess: (updatedBoard) => {
            queryClient.setQueryData(["board", updatedBoard.id], updatedBoard);

            queryClient.invalidateQueries({
                queryKey: ["boards"],
            });

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
            name: boardData?.name ?? "",

            columns: boardData?.columns.map((column) => ({
                name: column.name,
                id: column.id.toString(),
            })) ?? [
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

    const submitBoardHandler = (data: CreateBoardForm) => {
        const board: CreateBoardInput = {
            name: data.name,

            columns: data.columns.map((column, index) => ({
                name: column.name,
                id: Number(column.id),
                position: index,
            })),
        };

        if (isEditing && boardData) {
            updateBoardMutation({
                boardId: boardData.id,
                data: board,
            });
        } else {
            createBoardMutation(board);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(submitBoardHandler)}
            className="text-white"
        >
            <BoardFormHeader onClose={onClose} />
            <BoardFormName
                register={register}
                boardFormNameError={errors.name?.message}
            />

            <BoardColumnFields
                control={control}
                register={register}
                errors={errors}
            />

            <div className="my-6 border-t border-white/10" />

            <FormActions
                isEditing={isEditing}
                onClose={onClose}
                isPending={isPending}
            />
        </form>
    );
};

export default BoardForm;
