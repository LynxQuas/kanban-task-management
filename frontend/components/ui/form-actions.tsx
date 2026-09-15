import { Check } from "lucide-react";

type TaskFormActionsProps = {
    onClose: () => void;
    isPending: boolean;
    isEditing: boolean;
};

const FormActions = ({
    onClose,
    isPending,
    isEditing,
}: TaskFormActionsProps) => {
    const submitButtonText = isEditing ? "Update task" : "Create task";
    const loadingText = isEditing ? "Updating..." : "Creating...";

    return (
        <div className="mt-5 flex items-center justify-end gap-3">
            <button
                type="button"
                onClick={onClose}
                disabled={isPending}
                className=" rounded-lg px-4 py-2.5 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white "
            >
                Cancel
            </button>

            <button
                type="submit"
                disabled={isPending}
                className=" flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 "
            >
                <Check size={16} />
                {isPending ? loadingText : submitButtonText}
            </button>
        </div>
    );
};

export default FormActions;
