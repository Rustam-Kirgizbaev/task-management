import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common'
import { ApiParam, ApiTags } from '@nestjs/swagger'

import { CreateOrganizationUserDTO } from './dtos/create-organization-user.dto'
import { UpdateOrganizationUserDTO } from './dtos/update-organization-user.dto'
import { OrganizationUsersService } from './organization-users.service'

@ApiTags('OrganizationUsers')
@Controller('api/org-users')
export class OrganizationUsersController {
  constructor(
    private readonly organizationUsersService: OrganizationUsersService,
  ) {}

  @Get('/')
  async getAll() {
    return await this.organizationUsersService.getAll()
  }

  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'id of the needed organization-user',
  })
  @Get('/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.organizationUsersService.getById(id)
  }

  @Post('/')
  async create(@Body() payload: CreateOrganizationUserDTO) {
    return await this.organizationUsersService.create(payload)
  }

  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'id of the needed organization-user',
  })
  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOrganizationUserDTO,
  ) {
    return await this.organizationUsersService.update(id, payload)
  }

  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'id of the needed organization-user',
  })
  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.organizationUsersService.delete(id)
  }
}
