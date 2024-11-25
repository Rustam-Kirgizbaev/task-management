import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { AdminService } from './admin.service'

@ApiTags('Admin')
@Controller('api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/organizations')
  async getStats() {
    return await this.adminService.getOrganizationStats()
  }

  @Get('/projects')
  async getDetailedStats() {
    return await this.adminService.getOrganizationProjectStats()
  }

  @Get('/count')
  async getCountStats() {
    return await this.adminService.getOverallCounts()
  }
}
