import { CreateTaskForm } from "@/libs/schemas/task";
import { UseFormRegister } from "react-hook-form";

type TaskDescriptionProps = {
    register: UseFormRegister<CreateTaskForm>;
    taskDescriptionErrors?: string;
};

const TaskDescription = ({
    register,
    taskDescriptionErrors,
}: TaskDescriptionProps) => {
    return (
        <div className="mb-5">
            <label
                htmlFor="task-description"
                className="mb-2 block text-sm font-medium text-gray-300"
            >
                Description
            </label>

            <textarea
                {...register("description")}
                id="task-description"
                rows={4}
                placeholder="Add some details about this task..."
                className=" w-full resize-none rounded-lg border border-white/10 bg-[#20212C] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
                        "
            />

            {taskDescriptionErrors && (
                <p className="mt-2 text-xs text-red-400">
                    {taskDescriptionErrors}
                </p>
            )}
        </div>
    );
};

export default TaskDescription;
