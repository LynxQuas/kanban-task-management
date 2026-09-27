"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createBoardSchema, CreateBoardForm } from "@/libs/schemas/board";
import { Board, CreateBoardInput } from "@/libs/types/board";
import useBoardFormMutation from "@/hooks/board/useBoardFormMutation";
import FormActions from "@/components/ui/form-actions";
import BoardColumnFields from "./board-column-fields";
import BoardFormName from "./board-form-name";
import BoardFormHeader from "./board-form-header";

type BoardFormProps = {
    onClose: () => void;
    boardData?: Board;
};

const BoardForm = ({ onClose, boardData }: BoardFormProps) => {
    const isEditing = Boolean(boardData);

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

    const { submit, isPending } = useBoardFormMutation(onClose);

    const submitBoardHandler = (data: CreateBoardForm) => {
        const board: CreateBoardInput = {
            name: data.name,

            columns: data.columns.map((column, index) => ({
                name: column.name,
                id: Number(column.id),
                position: index,
            })),
        };

        submit({
            isEditing,
            boardId: boardData?.id,
            data: board,
        });
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
