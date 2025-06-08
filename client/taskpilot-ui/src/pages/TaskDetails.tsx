import { useQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import axios from "axios";
import type { Task } from "../types/task";

export default function TaskDetails() {
  const { taskId } = useParams({ from: "/tasks/$taskId" });

  const { data: task, isLoading, isError } = useQuery<Task>({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3030/api/tasks/${taskId}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading task...</p>;
  if (isError || !task) return <p>Failed to load task.</p>;

  return (
    <div>
      <h2>Task Details</h2>
      <p><strong>Name:</strong> {task.name}</p>
      <p><strong>Description:</strong> {task.description || "(none)"}</p>
      <p><strong>Start:</strong> {new Date(task.startDateTime).toLocaleString()}</p>
      <p><strong>End:</strong> {new Date(task.endDateTime).toLocaleString()}</p>
      <p><strong>Created By:</strong> {task.createdBy}</p>
    </div>
  );
}
