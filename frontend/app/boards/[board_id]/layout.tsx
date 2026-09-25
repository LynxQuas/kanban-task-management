import { ReactNode } from "react";
import BoardDetail from "@/components/board/board-detail";

type BoardLayoutProps = {
    children: ReactNode;
    task: ReactNode;
    params: Promise<{
        board_id: string;
    }>;
};

export default async function BoardLayout({
    children,
    task,
    params,
}: BoardLayoutProps) {
    const { board_id } = await params;

    return (
        <div className="relative h-full">
            <BoardDetail board_id={board_id} />

            {task}

            {children}
        </div>
    );
}
