import { CreateTaskForm } from "@/libs/schemas/task";
import { CalendarDays } from "lucide-react";
import { UseFormRegister } from "react-hook-form";

type TaskDueDateProps = {
    register: UseFormRegister<CreateTaskForm>;
    isPending: boolean;
    taskDueDateErrors?: string;
};

const TaskDueDate = ({
    register,
    isPending,
    taskDueDateErrors,
}: TaskDueDateProps) => {
    return (
        <div className="mb-6">
            <label
                htmlFor="task-due-date"
                className="mb-2 block text-sm font-medium text-gray-300"
            >
                Due date
            </label>

            <div className="relative">
                <CalendarDays
                    size={16}
                    className=" pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 "
                />

                <input
                    {...register("due_date")}
                    id="task-due-date"
                    type="date"
                    disabled={isPending}
                    className=" w-full rounded-lg border border-white/10 bg-[#20212C] py-2.5 pl-9 pr-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 "
                />
            </div>

            {taskDueDateErrors && (
                <p className="mt-2 text-xs text-red-400">{taskDueDateErrors}</p>
            )}
        </div>
    );
};
export default TaskDueDate;
