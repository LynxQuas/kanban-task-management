import { useDroppable } from "@dnd-kit/core";
import { Board, Column } from "@/libs/types/board";
import { Task } from "@/libs/types/task";
import Tasks from "../task/task";

type ColumnHeaderProps = {
    column: Column;
    taskCount: number;
    tasks: Task[];
    columns: Column[];
    board: Board;
};

const ColumnHeader = ({
    column,
    taskCount,
    columns,
    board,
}: ColumnHeaderProps) => {
    const { setNodeRef, isOver } = useDroppable({
        id: column.id,
    });

    return (
        <div className="flex w-85 shrink-0 flex-col">
            <div className="mb-3 flex items-center justify-between px-1">
                <div className="flex min-w-0 items-center gap-2.5">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500/40" />

                    <h2 className="truncate text-xs font-semibold uppercase tracking-[0.12em] text-gray-400">
                        {column.name}
                    </h2>
                </div>

                <span className="flex h-6 min-w-6 items-center justify-center rounded-md bg-white/5 px-2 text-xs font-medium text-gray-500">
                    {taskCount}
                </span>
            </div>

            <div
                ref={setNodeRef}
                className={`min-h-150 rounded-xl border p-3 transition-colors md:min-h-170 ${
                    isOver
                        ? "border-indigo-400/30 bg-indigo-500/10"
                        : "border-white/5 bg-[#252631]"
                }`}
            >
                <Tasks tasks={column.tasks} columns={columns} board={board} />
            </div>
        </div>
    );
};

export default ColumnHeader;
