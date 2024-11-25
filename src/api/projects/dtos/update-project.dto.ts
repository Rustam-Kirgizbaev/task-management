import { IsNumber } from 'class-validator'

export class UpdateProjectDTO {
  @IsNumber()
  org_id: number
}
