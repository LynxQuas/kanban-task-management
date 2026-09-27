import { CreateTaskForm } from "@/libs/schemas/task";
import { ChevronDown, Flag } from "lucide-react";

import { UseFormRegister } from "react-hook-form";

type TaskPriorityProps = {
    register: UseFormRegister<CreateTaskForm>;
    isPending: boolean;
    priorityErrors?: string;
};

const TaskFormPriority = ({
    register,
    isPending,
    priorityErrors,
}: TaskPriorityProps) => {
    return (
        <div>
            <label
                htmlFor="task-priority"
                className="mb-2 block text-sm font-medium text-gray-300"
            >
                Priority
            </label>

            <div className="relative">
                <Flag
                    size={15}
                    className=" pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 "
                />

                <select
                    {...register("priority")}
                    id="task-priority"
                    disabled={isPending}
                    className="
                                    w-full appearance-none rounded-lg
                                    border border-white/10 bg-[#20212C]
                                    py-2.5 pl-9 pr-9 text-sm text-white
                                    outline-none transition
                                    focus:border-indigo-500
                                    focus:ring-2 focus:ring-indigo-500/20
                                "
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <ChevronDown
                    size={16}
                    className=" pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 "
                />
            </div>

            {priorityErrors && (
                <p className="mt-2 text-xs text-red-400">{priorityErrors}</p>
            )}
        </div>
    );
};

export default TaskFormPriority;
