import BoardDetail from "@/components/board/board-detail";

type BoardDetailPageProps = {
    params: Promise<{ board_id: string }>;
};
const BoardDetailPage = async ({ params }: BoardDetailPageProps) => {
    const { board_id } = await params;

    return (
        <div className="flex overflow-hidden bg-[#20212C] h-full flex-col">
            <BoardDetail board_id={board_id} />;
        </div>
    );
};

export default BoardDetailPage;
