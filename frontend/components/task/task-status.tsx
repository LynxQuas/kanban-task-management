import { CreateTaskForm } from "@/libs/schemas/task";
import { Column } from "@/libs/types/board";
import { ChevronDown } from "lucide-react";
import React from "react";
import { UseFormRegister } from "react-hook-form";

type TaskStatusProps = {
    register: UseFormRegister<CreateTaskForm>;
    columns: Column[];
    columnErrors?: string;
};

const TaskStatus = ({ register, columns, columnErrors }: TaskStatusProps) => {
    return (
        <div>
            <label
                htmlFor="task-column"
                className="mb-2 block text-sm font-medium text-gray-300"
            >
                Status
            </label>

            <div className="relative">
                <select
                    {...register("column_id", {
                        valueAsNumber: true,
                    })}
                    id="task-column"
                    className=" w-full appearance-none rounded-lg border border-white/10 bg-[#20212C] px-3 py-2.5 pr-9 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 "
                >
                    {columns.map((column) => (
                        <option key={column.id} value={column.id}>
                            {column.name}
                        </option>
                    ))}
                </select>

                <ChevronDown
                    size={16}
                    className=" pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 "
                />
            </div>

            {columnErrors && (
                <p className="mt-2 text-xs text-red-400">{columnErrors}</p>
            )}
        </div>
    );
};

export default TaskStatus;
