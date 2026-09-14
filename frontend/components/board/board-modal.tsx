import { Board } from "@/libs/types/board";
import ModalLayout from "../modal-layout";
import BoardForm from "./board-form/board-form";

type CreateBoardModalProps = {
    isOpen: boolean;
    onClose: () => void;
    boardData?: Board;
};

const BoardModal = ({ isOpen, onClose, boardData }: CreateBoardModalProps) => {
    return (
        <ModalLayout isOpen={isOpen} onClose={onClose}>
            <BoardForm onClose={onClose} boardData={boardData} />
        </ModalLayout>
    );
};

export default BoardModal;
