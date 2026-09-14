"use client";
import { createBoard } from "@/libs/boards";
import { CreateBoardForm, createBoardSchema } from "@/libs/schemas/board";
import { CreateBoardInput } from "@/libs/types/board";
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

            <FormActions onClose={onClose} isPending={isPending} />
        </form>
    );
};

export default BoardForm;
