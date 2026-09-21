"use client";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { cn } from "@/libs/utils";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { useRef, useState } from "react";

type DropDownActionsProps = {
    handleEdit: () => void;
    handleDelete: () => void;
    label: string;
    className?: string;
    iconSize?: number;
};

const DropDownActions = ({
    handleEdit,
    handleDelete,
    label,
    className,
    iconSize = 18,
}: DropDownActionsProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleEditClick = () => {
        handleEdit();
        setIsMenuOpen(false);
    };

    const handleDeleteClick = () => {
        handleDelete();
        setIsMenuOpen(false);
    };

    useClickOutside(menuRef, () => {
        setIsMenuOpen(false);
    });

    useEscapeKey(() => {
        setIsMenuOpen(false);
    });

    return (
        <div ref={menuRef} className="relative">
            <button
                className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg border border-white/5 text-gray-400 transition hover:bg-white/5 hover:text-white",
                    className,
                )}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                type="button"
            >
                <EllipsisVertical size={iconSize} />
            </button>

            {isMenuOpen && (
                <div className="absolute right-0 top-12 z-50 w-48 overflow-hidden rounded-lg border border-white/10 bg-[#2B2C37] p-1 shadow-xl">
                    <button
                        type="button"
                        onClick={handleEditClick}
                        className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
                    >
                        <Pencil size={15} />

                        <span>Edit {label}</span>
                    </button>

                    <button
                        type="button"
                        onClick={handleDeleteClick}
                        className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-400/10 hover:text-red-300"
                    >
                        <Trash2 size={15} />

                        <span>Delete {label}</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default DropDownActions;
