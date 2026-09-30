import { useToast } from "@/context/toast-context";
import { deleteBoard } from "@/libs/boards";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useDeleteBoard = () => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { showToast } = useToast();

    return useMutation({
        mutationFn: deleteBoard,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["boards"],
            });

            showToast("Board deleted successfully.");

            router.push("/boards");
        },

        onError: () => {
            showToast("Failed to delete board.", "error");
        },
    });
};

export default useDeleteBoard;
