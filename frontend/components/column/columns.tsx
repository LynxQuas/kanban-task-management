import { Board } from "@/libs/types/board";
import ColumnHeader from "./column-header";

type ColumnsProps = {
    board: Board;
};

const Columns = ({ board }: ColumnsProps) => {
    return (
        <div className="min-h-0 flex-1 overflow-x-auto bg-[#20212C]">
            <div className="flex min-w-max gap-5 p-5">
                {board.columns.map((column) => {
                    const taskCount = column.tasks?.length ?? 0;

                    return (
                        <ColumnHeader
                            key={column.id}
                            column={column}
                            taskCount={taskCount}
                            tasks={column.tasks ?? []}
                            columns={board.columns}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Columns;
