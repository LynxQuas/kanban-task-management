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
