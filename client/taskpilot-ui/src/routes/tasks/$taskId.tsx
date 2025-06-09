import { createFileRoute } from '@tanstack/react-router'
import TaskDetails from '../../pages/TaskDetails'

export const Route = createFileRoute('/tasks/$taskId')({
  component: TaskDetails,
})
