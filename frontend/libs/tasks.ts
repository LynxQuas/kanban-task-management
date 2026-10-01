import { CreateTaskForm } from "./schemas/task";
import { Task } from "./types/task";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/tasks`;

export async function getTasks() {
    const response = await fetch(`${API_URL}/`);

    if (!response.ok) {
        throw new Error("Failed to fetch boards");
    }

    return response.json();
}

export async function createTask(taskData: CreateTaskForm): Promise<Task> {
    const response = await fetch(`${API_URL}`, {
        method: "POST",
        credentials: "include",
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
    const response = await fetch(`${API_URL}/${taskId}`, {
        method: "PATCH",
        credentials: "include",
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
    const response = await fetch(`${API_URL}/${taskId}`, {
        method: "DELETE",
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to delete task");
    }
}

export const getTask = async (task_id: number): Promise<Task> => {
    const response = await fetch(`${API_URL}/${task_id}`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch task");
    }

    return response.json();
};
