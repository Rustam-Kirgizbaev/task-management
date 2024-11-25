import { Transform } from 'class-transformer'
import { IsDate, IsNumber, IsOptional } from 'class-validator'

export class CreateTaskDTO {
  @IsNumber()
  project_id: number

  @IsNumber()
  created_by: number

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  due_date: Date

  @IsNumber()
  worker_user_id: number
}
