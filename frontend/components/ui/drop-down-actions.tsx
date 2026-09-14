import { Pencil, Trash2 } from "lucide-react";

type DropDownActionsProps = {
    handleEdit: () => void;
    handleDelete: () => void;
    label: string;
};

const DropDownActions = ({
    handleEdit,
    handleDelete,
    label,
}: DropDownActionsProps) => {
    return (
        <div className="absolute right-0 top-12 z-50 w-48 overflow-hidden rounded-lg border border-white/10 bg-[#2B2C37] p-1 shadow-xl">
            <button
                type="button"
                onClick={handleEdit}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
            >
                <Pencil size={15} />

                <span>Edit {label}</span>
            </button>

            <button
                type="button"
                onClick={handleDelete}
                className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-400/10 hover:text-red-300"
            >
                <Trash2 size={15} />

                <span>Delete {label}</span>
            </button>
        </div>
    );
};

export default DropDownActions;
