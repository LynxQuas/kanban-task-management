import { CreateTaskForm } from "./schemas/task";
import { Task } from "./types/task";

const API_URL = "http://localhost:8000";

export async function getTasks() {
    const response = await fetch(`${API_URL}/tasks/`);

    if (!response.ok) {
        throw new Error("Failed to fetch boards");
    }

    return response.json();
}

export async function createTask(taskData: CreateTaskForm): Promise<Task> {
    const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
    });

    if (!response.ok) {
        throw new Error("Failed to create board");
    }

    return response.json();
}

export async function updateTask(
    taskId: number,
    taskData: Partial<CreateTaskForm>,
): Promise<Task> {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
    });

    if (!response.ok) {
        throw new Error("Failed to update task");
    }

    return response.json();
}

export async function deleteTask(taskId: number): Promise<void> {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete task");
    }
}

export const getTask = async (task_id: number): Promise<Task> => {
    const response = await fetch(`http://localhost:8000/tasks/${task_id}`);

    if (!response.ok) {
        throw new Error("Failed to fetch task");
    }

    return response.json();
};
