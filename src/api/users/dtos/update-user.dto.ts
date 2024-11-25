import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator'

import { Role } from 'src/common/enums/role.enum'

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string

  @IsOptional()
  @IsEnum(Role)
  role: Role
}
