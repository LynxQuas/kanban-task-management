import {
    DragEndEvent,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import useMoveTask from "./useMoveTask";

const useBoardDragAndDrop = (boardId: string) => {
    const moveTask = useMoveTask(boardId);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 200,
                tolerance: 5,
            },
        }),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        moveTask.mutate({
            taskId: Number(active.id),
            columnId: Number(over.id),
        });
    };

    return {
        sensors,
        handleDragEnd,
    };
};

export default useBoardDragAndDrop;
