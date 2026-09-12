import { z } from "zod";

export const createBoardSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Board name is required."),

    columns: z
        .array(
            z.object({
                id: z.string(),
                name: z
                    .string()
                    .trim()
                    .min(1, "Column name is required."),
            })
        )
        .min(1, "You need at least one column."),
});

export type CreateBoardForm = z.infer<typeof createBoardSchema>;

