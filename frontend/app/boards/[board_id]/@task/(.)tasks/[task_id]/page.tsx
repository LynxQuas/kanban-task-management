import TaskDetailSidebar from "@/components/task/task-detail-sidebar";

type TaskDetailPageProps = {
    params: Promise<{
        board_id: string;
        task_id: string;
    }>;
};

const TaskDetailPage = async ({ params }: TaskDetailPageProps) => {
    const { board_id, task_id } = await params;

    return <TaskDetailSidebar board_id={board_id} task_id={task_id} />;
};

export default TaskDetailPage;
