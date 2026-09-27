import { deleteBoard } from "@/libs/boards";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useDeleteBoard = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation({
        mutationFn: deleteBoard,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["boards"],
            });

            router.push("/boards");
        },

        onError: (error) => {
            console.error(error);
        },
    });
};

export default useDeleteBoard;
