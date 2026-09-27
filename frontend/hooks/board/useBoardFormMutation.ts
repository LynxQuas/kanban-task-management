import { createBoard, updateBoard } from "@/libs/boards";
import { CreateBoardInput } from "@/libs/types/board";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type SubmitData = {
    isEditing: boolean;
    boardId: number | undefined;
    data: CreateBoardInput;
};

const useBoardFormMutation = (onClose: () => void) => {
    const queryClient = useQueryClient();
    const router = useRouter();

    const createMutation = useMutation({
        mutationFn: createBoard,

        onSuccess: (newBoard) => {
            queryClient.invalidateQueries({
                queryKey: ["boards"],
            });

            onClose();
            router.push(`/boards/${newBoard.id}`);
        },

        onError: (error) => {
            console.error(error);
        },
    });

    const updateMutation = useMutation({
        mutationFn: updateBoard,

        onSuccess: (updatedBoard) => {
            queryClient.setQueryData(["board", updatedBoard.id], updatedBoard);

            queryClient.invalidateQueries({
                queryKey: ["board"],
            });

            onClose();
        },

        onError: (error) => {
            console.error(error);
        },
    });

    const submit = ({ isEditing, boardId, data }: SubmitData) => {
        if (isEditing && boardId !== undefined) {
            updateMutation.mutate({
                boardId,
                data,
            });

            return;
        }

        createMutation.mutate(data);
    };

    return {
        submit,
        isPending: createMutation.isPending || updateMutation.isPending,
    };
};

export default useBoardFormMutation;
