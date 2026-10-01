import { useEffect } from "react";
import { useRouter } from "next/navigation";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/auth`;

export const useAuthRedirect = () => {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${API_URL}/me`, {
                    credentials: "include",
                });

                if (response.ok) {
                    router.replace("/boards");
                }
            } catch (error) {
                console.error(error);
            }
        };

        checkAuth();
    }, [router]);
};
