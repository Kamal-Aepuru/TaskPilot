import { createRoute } from '@tanstack/react-router'
import { tasksRoute } from './tasksRoute'
import TaskList from '../pages/TaskList'

export const taskListRoute = createRoute({
  getParentRoute: () => tasksRoute,
  path: '/',
  component: TaskList,
})
