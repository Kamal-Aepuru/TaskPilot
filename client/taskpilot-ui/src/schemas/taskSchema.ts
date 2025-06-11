import {z} from "zod";

export const TaskSchema = z.object({
    name: z.string().min(1,"Task name is required"),
    description: z.string().optional(),
    startDateTime:z.coerce.date(),
    endDateTime:z.coerce.date(),
    category:z.string().optional(),
    createdBy:z.string().min(1,"Created by is required")

})