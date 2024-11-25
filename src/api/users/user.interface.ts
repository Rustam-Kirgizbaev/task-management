import { Role } from 'src/common/enums/role.enum'

export interface IUser {
  id: number
  name: string
  role: Role
  created_by?: number
}
