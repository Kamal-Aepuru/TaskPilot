import { createFileRoute } from '@tanstack/react-router'
import TaskList from '../../pages/TaskList'

export const Route = createFileRoute('/tasks/')({
  component: TaskList,
})
