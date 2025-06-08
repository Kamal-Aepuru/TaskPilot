import { createRoute } from '@tanstack/react-router'
import { tasksRoute } from './tasksRoute'
import TaskDetails from '../pages/TaskDetails'

export const taskDetailsRoute = createRoute({
  getParentRoute: () => tasksRoute,
  path: '$taskId', 
  component: TaskDetails,
})
