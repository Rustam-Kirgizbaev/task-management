import { Module } from '@nestjs/common'

import { OrganizationUsersController } from './organization-users.controller'
import { OrganizationUsersService } from './organization-users.service'

@Module({
  imports: [],
  controllers: [OrganizationUsersController],
  providers: [OrganizationUsersService],
  exports: [OrganizationUsersService],
})
export class OrganizationUsersModule {}
