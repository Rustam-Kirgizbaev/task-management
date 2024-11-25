import { Transform } from 'class-transformer'
import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator'

import { TaskStatus } from 'src/common/enums/task-status.enum'

export class UpdateTaskDTO {
  @IsNumber()
  @IsOptional()
  project_id: number

  @IsNumber()
  @IsOptional()
  created_by: number

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  due_date: Date

  @IsNumber()
  @IsOptional()
  worker_user_id: number

  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus
}
