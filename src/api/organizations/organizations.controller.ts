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

import { CreateOrganizationDTO } from './dtos/create-organization.dto'
import { UpdateOrganizationDTO } from './dtos/update-organization.dto'
import { OrganizationsService } from './organizations.service'

@ApiTags('Organizations')
@Controller('api/organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get('/')
  async getAll() {
    return await this.organizationsService.getAll()
  }

  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'id of the needed organization',
  })
  @Get('/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.organizationsService.getById(id)
  }

  @Post('/')
  async create(@Body() payload: CreateOrganizationDTO) {
    return await this.organizationsService.create(payload)
  }

  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'id of the needed organization',
  })
  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOrganizationDTO,
  ) {
    return await this.organizationsService.update(id, payload)
  }

  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'id of the needed organization',
  })
  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.organizationsService.delete(id)
  }
}
