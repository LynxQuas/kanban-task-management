import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const useAuthRedirect = () => {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("http://localhost:8000/auth/me", {
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
