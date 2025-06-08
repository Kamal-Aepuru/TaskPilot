import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Task } from "../types/task";

export function useTasks() {
  return useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3030/api/tasks");
      return res.data;
    },
  });
}
