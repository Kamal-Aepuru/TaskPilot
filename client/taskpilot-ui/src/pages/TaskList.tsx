import { useTasks } from "../api/useTasks";

export default function TaskList() {
  const { data: tasks, isLoading, isError } = useTasks();

  if (isLoading) return <p>Loading tasks...</p>;
  if (isError) return <p>Failed to load tasks.</p>;

  return (
    <div>
      <h2>All Tasks</h2>
      <ul>
        {tasks?.map((task) => (
          <li key={task._id}>
            <strong>{task.title}</strong> - {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
