import { CreateBoardForm } from "@/libs/schemas/board";
import { UseFormRegister } from "react-hook-form";

type BoardFormNameProps = {
    register: UseFormRegister<CreateBoardForm>;
    boardFormNameError?: string;
};
const BoardFormName = ({
    register,
    boardFormNameError,
}: BoardFormNameProps) => {
    return (
        <div className="mb-6">
            <label
                htmlFor="board-name"
                className="mb-2 block text-sm font-medium text-gray-300"
            >
                Board name
            </label>

            <input
                {...register("name")}
                id="board-name"
                type="text"
                placeholder="e.g. Web Design"
                autoFocus
                className="w-full rounded-lg border border-white/10 bg-[#20212C] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />

            {boardFormNameError && (
                <p className="mt-2 text-xs text-red-400">
                    {boardFormNameError}
                </p>
            )}
        </div>
    );
};

export default BoardFormName;
