"use client";

import { useRef, useState } from "react";
import { ChevronUp, LogOut, User } from "lucide-react";

import { User as UserType } from "@/libs/types/auth";
import { useClickOutside } from "@/hooks/useClickOutside";

type UserProfileProps = {
    user: UserType | undefined;
    isLoading?: boolean;
    onLogout: () => void;
};

const UserProfile = ({
    user,
    isLoading = false,
    onLogout,
}: UserProfileProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    useClickOutside(profileRef, () => {
        setIsOpen(false);
    });

    if (isLoading) {
        return (
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/3 p-3">
                <div className="h-10 w-10 animate-pulse rounded-lg bg-white/10" />

                <div className="min-w-0 flex-1 space-y-2">
                    <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
                    <div className="h-2.5 w-32 animate-pulse rounded bg-white/10" />
                </div>
            </div>
        );
    }

    if (!user) {
        return null;
    }

    const initial = user.name.charAt(0).toUpperCase();

    return (
        <div ref={profileRef} className="relative">
            {isOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-2 overflow-hidden rounded-xl border border-white/10 bg-[#20212C] shadow-xl shadow-black/20">
                    <div className="mx-3 border-t border-white/10" />

                    <button
                        type="button"
                        onClick={onLogout}
                        className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
                    >
                        <LogOut size={17} />
                        Log out
                    </button>
                </div>
            )}

            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/3 p-3 text-left transition hover:border-white/15 hover:bg-white/6"
            >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-sm font-semibold text-indigo-400">
                    {initial}
                </div>

                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-200">
                        {user.name}
                    </p>

                    <p className="truncate text-xs text-gray-500">
                        {user.email}
                    </p>
                </div>

                <ChevronUp
                    size={17}
                    className={`shrink-0 text-gray-500 transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>
        </div>
    );
};

export default UserProfile;
