type TaskDetailBadgeProps = {
    children: React.ReactNode;
    className?: string;
};

const TaskDetailBadge = ({
    children,
    className = "",
}: TaskDetailBadgeProps) => {
    return (
        <div
            className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium ${className}`}
        >
            {children}
        </div>
    );
};

export default TaskDetailBadge;
