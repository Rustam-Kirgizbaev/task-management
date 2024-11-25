import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

import { Role } from 'src/common/enums/role.enum'

export class CreateUserDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string

  @IsEnum(Role)
  role: Role

  @IsOptional()
  @IsNumber()
  created_by: number
}
