import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { Task } from "../types/task";

interface UpdateTaskInput {
  id: string;
  updatedTask: Partial<Task>;
}

export function useUpdateTask() {
  return useMutation({
    mutationFn: async ({ id, updatedTask }: UpdateTaskInput) => {
      const payload = {
        ...updatedTask,
        startDateTime: new Date(updatedTask.startDateTime!).toISOString(),
        endDateTime: new Date(updatedTask.endDateTime!).toISOString(),
        category:
          updatedTask.category && updatedTask.category.length === 24
            ? updatedTask.category
            : undefined,
      };

      const res = await axios.put(
        `http://localhost:3030/api/tasks/${id}`,
        payload
      );

      return res.data;
    },
  });
}
