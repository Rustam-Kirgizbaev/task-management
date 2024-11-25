import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateOrganizationDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string

  @IsNumber()
  created_by: number
}
