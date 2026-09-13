import ModalLayout from "../modal-layout";
import BoardForm from "./board-form";

type CreateBoardModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const BoardModal = ({ isOpen, onClose }: CreateBoardModalProps) => {
    return (
        <ModalLayout isOpen={isOpen} onClose={onClose}>
            <BoardForm onClose={onClose} />
        </ModalLayout>
    );
};

export default BoardModal;
