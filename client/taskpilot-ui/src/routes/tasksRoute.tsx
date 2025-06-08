import { createRoute, Outlet } from '@tanstack/react-router'
import { rootRoute } from '../router'

export const tasksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/tasks',
  component: () => <Outlet />,
})
