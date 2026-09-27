import TaskDetailSidebar from "@/components/task/task-detail-sidebar";

type TaskPageProps = {
    params: Promise<{
        board_id: string;
        task_id: string;
    }>;
};

export default async function TaskPage({ params }: TaskPageProps) {
    const { board_id, task_id } = await params;

    return <TaskDetailSidebar board_id={board_id} task_id={task_id} />;
}
