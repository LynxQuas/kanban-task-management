import { X } from "lucide-react";

type TaskDetailHeaderProps = {
    onClose: () => void;
    actions?: React.ReactNode;
};

const TaskDetailHeader = ({ onClose, actions }: TaskDetailHeaderProps) => {
    return (
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/6 px-5">
            <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.6)]" />

                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">
                    Task details
                </span>
            </div>

            <div className="flex items-center gap-1">
                {actions}

                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-xl border border-white/5 p-2 text-gray-500 transition hover:border-white/10 hover:bg-white/6 hover:text-gray-200"
                    aria-label="Close task details"
                >
                    <X size={17} />
                </button>
            </div>
        </div>
    );
};

export default TaskDetailHeader;
