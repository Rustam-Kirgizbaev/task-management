import { IsNumber } from 'class-validator'

export class CreateOrganizationUserDTO {
  @IsNumber()
  org_id: number

  @IsNumber()
  user_id: number
}
