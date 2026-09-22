import { getBoard } from "@/libs/boards";
import { Board } from "@/libs/types/board";
import { useQuery } from "@tanstack/react-query";

const useBoard = (boardId: string) => {
    return useQuery<Board>({
        queryKey: ["board", boardId],
        queryFn: () => getBoard(boardId),
        enabled: !!boardId,
    });
};

export default useBoard;
