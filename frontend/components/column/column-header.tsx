import { Column } from "@/libs/types/board";
import { Task } from "@/libs/types/task";
import Tasks from "../task/task";

type ColumnHeaderProps = {
    column: Column;
    taskCount: number;
    tasks: Task[];
};

const ColumnHeader = ({ column, taskCount }: ColumnHeaderProps) => {
    return (
        <div key={column.id} className="flex w-85 shrink-0 flex-col">
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

            <div className="min-h-150  md:min-h-170 rounded-xl border border-white/5 bg-[#252631] p-3 transition-colors">
                <Tasks tasks={column.tasks} />
            </div>
        </div>
    );
};

export default ColumnHeader;
