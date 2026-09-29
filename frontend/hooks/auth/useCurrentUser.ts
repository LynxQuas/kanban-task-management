"use client";

import { useQuery } from "@tanstack/react-query";

type CurrentUser = {
    id: number;
    name: string;
    email: string;
};

async function getCurrentUser(): Promise<CurrentUser> {
    const response = await fetch("http://localhost:8000/auth/me", {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to get current user");
    }

    return response.json();
}

export function useCurrentUser() {
    return useQuery<CurrentUser>({
        queryKey: ["current-user"],
        queryFn: getCurrentUser,
        retry: false,
    });
}
