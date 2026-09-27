import { Pencil, Plus, X } from "lucide-react";

type TaskModalHeaderProps = {
    onClose: () => void;
    isPending: boolean;
    isEditing: boolean;
};

const TaskModalHeader = ({
    onClose,
    isPending,
    isEditing,
}: TaskModalHeaderProps) => {
    return (
        <div className="mb-7 flex items-start justify-between">
            <div>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/15">
                    {isEditing ? (
                        <Pencil size={20} className="text-indigo-400" />
                    ) : (
                        <Plus size={20} className="text-indigo-400" />
                    )}
                </div>

                <h2 className="text-xl font-semibold tracking-tight">
                    {isEditing ? "Edit task" : "Create a new task"}
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                    {isEditing
                        ? "Update your task details."
                        : "Add a task and keep your work moving forward."}
                </p>
            </div>

            <button
                type="button"
                onClick={onClose}
                disabled={isPending}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
                <X size={18} />
            </button>
        </div>
    );
};

export default TaskModalHeader;
