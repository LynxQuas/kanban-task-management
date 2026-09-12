export type Priority = "Low" | "Medium" | "High";

export type Task = {
    id: number;
    title: string;
    description: string;
    column_id: number;
    due_date: string;
    priority: Priority;
};

export type CreateTaskInput = {
    title: string;
    description: string;
    column_id: number;
    due_date: string;
    priority: string;
};
