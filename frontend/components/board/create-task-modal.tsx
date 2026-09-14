import { Column } from "@/libs/types/board";
import ModalLayout from "../modal-layout";
import TaskForm from "../task/task-form/task-form";

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
    return (
        <ModalLayout isOpen={isOpen} onClose={onClose}>
            <TaskForm onClose={onClose} columns={columns} />
        </ModalLayout>
    );
};

export default CreateTaskModal;
