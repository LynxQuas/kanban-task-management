import z from "zod";

export const createTaskSchema = z.object({
    title: z.string().trim().min(1, "Task title is required."),

    description: z.string().trim().min(1, "Task description is required."),

    column_id: z.number().int().positive("Column is required."),

    priority: z.string().min(1, "Priority is required."),

    due_date: z
        .string()
        .min(1, "Due date is required.")
        .refine((date) => {
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return selectedDate >= today;
        }, "Due date cannot be in the past."),
});

export type CreateTaskForm = z.infer<typeof createTaskSchema>;
