import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => (
    <div>
      <h1>Task Manager</h1>
      <Outlet />
    </div>
  ),
})
