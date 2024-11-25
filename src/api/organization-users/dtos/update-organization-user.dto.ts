import { IsNumber, IsOptional } from 'class-validator'

export class UpdateOrganizationUserDTO {
  @IsNumber()
  @IsOptional()
  org_id: number

  @IsNumber()
  @IsOptional()
  user_id: number
}
