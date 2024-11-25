import { IsNumber } from 'class-validator'

export class CreateProjectDTO {
  @IsNumber()
  org_id: number

  @IsNumber()
  created_by: number
}
