import { LayoutDashboard, Plus } from "lucide-react";

type CreateFirstBoardProps = {
    onOpenBoardCreateModal: () => void;
};

const CreateFirstBoard = ({
    onOpenBoardCreateModal,
}: CreateFirstBoardProps) => {
    return (
        <div className="w-full max-w-lg text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-[#2B2C37] shadow-xl shadow-black/10">
                <LayoutDashboard size={28} className="text-indigo-400" />
            </div>

            <h1 className="text-2xl font-semibold tracking-tight text-white">
                Create your first board
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
                Boards help you organize projects, track tasks, and keep your
                work moving forward.
            </p>

            <button
                onClick={onOpenBoardCreateModal}
                className="mt-7 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-600/10 transition hover:bg-indigo-500"
            >
                <Plus size={17} />
                Create your first board
            </button>
        </div>
    );
};

export default CreateFirstBoard;
