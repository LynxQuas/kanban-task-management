import { CreateTaskForm } from "@/libs/schemas/task";
import { UseFormRegister } from "react-hook-form";

type TaskTitleProps = {
    register: UseFormRegister<CreateTaskForm>;
    taskTitleError?: string;
};

const TaskTitle = ({ register, taskTitleError }: TaskTitleProps) => {
    return (
        <div className="mb-5">
            <label
                htmlFor="task-title"
                className="mb-2 block text-sm font-medium text-gray-300"
            >
                Task title
            </label>

            <input
                {...register("title")}
                id="task-title"
                type="text"
                placeholder="e.g. Design login page"
                autoFocus
                className=" w-full rounded-lg border border-white/10 bg-[#20212C] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                        "
            />

            {taskTitleError && (
                <p className="mt-2 text-xs text-red-400">{taskTitleError}</p>
            )}
        </div>
    );
};

export default TaskTitle;
