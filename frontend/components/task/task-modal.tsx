import { Column } from "@/libs/types/board";
import ModalLayout from "../modal-layout";
import TaskForm from "./task-form/task-form";
import { Task } from "@/libs/types/task";

type TaskModalProps = {
    isOpen: boolean;
    onClose: () => void;
    columns: Column[];
    task?: Task;
};

const TaskModal = ({ isOpen, onClose, columns, task }: TaskModalProps) => {
    return (
        <ModalLayout isOpen={isOpen} onClose={onClose}>
            <TaskForm task={task} onClose={onClose} columns={columns} />
        </ModalLayout>
    );
};

export default TaskModal;
