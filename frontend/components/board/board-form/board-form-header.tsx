import { Columns3, X } from "lucide-react";

type BoardFormHeaderProps = {
    onClose: () => void;
};

const BoardFormHeader = ({ onClose }: BoardFormHeaderProps) => {
    return (
        <div className="mb-7 flex items-start justify-between">
            <div>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600/15">
                    <Columns3 size={20} className="text-indigo-400" />
                </div>

                <h2 className="text-xl font-semibold tracking-tight">
                    Create a new board
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                    Organize your work with a new Kanban board.
                </p>
            </div>

            <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition hover:bg-white/5 hover:text-white"
            >
                <X size={18} />
            </button>
        </div>
    );
};

export default BoardFormHeader;
