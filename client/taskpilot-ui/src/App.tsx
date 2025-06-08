import { Outlet } from "@tanstack/react-router";

export default function App() {
  return (
    <div>
      <h1>Task Manager</h1>
      <Outlet />
    </div>
  );
}
