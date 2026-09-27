"use client";
import useDeleteBoard from "@/hooks/board/useDeleteBoard";
import DeleteConfirmationModal from "../delete-confirmation-modal";

type DeleteBoardModalProps = {
    boardId: number;
    boardName: string;
    isOpen: boolean;
    onClose: () => void;
};

const DeleteBoardModal = ({
    boardId,
    boardName,
    isOpen,
    onClose,
}: DeleteBoardModalProps) => {
    const { mutate: deleteBoard, isPending } = useDeleteBoard();

    return (
        <DeleteConfirmationModal
            isOpen={isOpen}
            isPending={isPending}
            title="Delete board?"
            description={
                <>
                    Are you sure you want to delete{" "}
                    <span className="font-medium text-gray-200">
                        &quot;{boardName}&quot;
                    </span>
                    ? This action will permanently delete the board and its
                    tasks.
                </>
            }
            confirmLabel="Delete board"
            pendingLabel="Deleting..."
            onClose={onClose}
            onConfirm={() => deleteBoard(boardId)}
        />
    );
};

export default DeleteBoardModal;
