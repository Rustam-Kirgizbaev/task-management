import { TaskStatus } from 'src/common/enums/task-status.enum'

export interface ITask {
  id: number
  status: TaskStatus
  created_by: number
  created_at: Date
  project_id: number
  due_date: Date
  worker_user_id: number
  done_at: Date
}
