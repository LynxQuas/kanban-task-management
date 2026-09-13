import { CreateBoardForm } from "@/libs/schemas/board";
import { Plus, X } from "lucide-react";
import {
    Control,
    FieldErrors,
    useFieldArray,
    UseFormRegister,
} from "react-hook-form";

type BoardColumnFieldsProps = {
    control: Control<CreateBoardForm>;
    register: UseFormRegister<CreateBoardForm>;
    errors: FieldErrors<CreateBoardForm>;
};

const BoardColumnFields = ({
    control,
    register,
    errors,
}: BoardColumnFieldsProps) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "columns",
    });

    const addColumn = () => {
        append({
            id: crypto.randomUUID(),
            name: "",
        });
    };
    return (
        <div>
            <div className="mb-3 flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-medium text-gray-300">
                        Columns
                    </h3>

                    <p className="mt-1 text-xs text-gray-500">
                        Add the stages you use to track your work.
                    </p>
                </div>

                <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-gray-400">
                    {fields.length}
                </span>
            </div>

            <div className="space-y-2">
                {fields.map((field, index) => (
                    <div key={field.id}>
                        <div className="group flex items-center gap-2">
                            {/* Position */}
                            <div className="flex h-10 w-7 shrink-0 items-center justify-center text-xs text-gray-500">
                                {index + 1}
                            </div>

                            {/* Input */}
                            <input
                                {...register(`columns.${index}.name`)}
                                type="text"
                                placeholder={`Column ${index + 1}`}
                                className="min-w-0 flex-1 rounded-lg border border-white/10 bg-[#20212C] px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-600 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                            />

                            {/* Remove */}
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                disabled={fields.length === 1}
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                <X size={17} />
                            </button>
                        </div>

                        {errors.columns?.[index]?.name && (
                            <p className="ml-7 mt-1 text-xs text-red-400">
                                {errors.columns[index]?.name?.message}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            {errors.columns?.root && (
                <p className="mt-2 text-xs text-red-400">
                    {errors.columns.root.message}
                </p>
            )}

            <button
                type="button"
                onClick={addColumn}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-white/10 bg-white/2 py-2.5 text-sm font-medium text-gray-400 transition hover:border-indigo-500/40 hover:bg-indigo-500/5 hover:text-indigo-400"
            >
                <Plus size={16} />
                Add new column
            </button>
        </div>
    );
};

export default BoardColumnFields;
