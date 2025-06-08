// api/useTask.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Task } from "../types/task";

export const useTask = (taskId: string) => {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const res = await axios.get<Task>(`http://localhost:3030/api/tasks/${taskId}`);
      return res.data;
    },
    enabled: !!taskId, // fetch only when taskId exists
  });
};
