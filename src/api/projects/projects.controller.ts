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

import { CreateProjectDTO } from './dtos/create-project.dto'
import { UpdateProjectDTO } from './dtos/update-project.dto'
import { ProjectsService } from './projects.service'

@ApiTags('Projects')
@Controller('api/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get('/')
  async getAll() {
    return await this.projectsService.getAll()
  }

  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'id of the needed organization',
  })
  @Get('/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.projectsService.getById(id)
  }

  @Post('/')
  async create(@Body() payload: CreateProjectDTO) {
    return await this.projectsService.create(payload)
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
    @Body() payload: UpdateProjectDTO,
  ) {
    return await this.projectsService.update(id, payload)
  }

  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'id of the needed organization',
  })
  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.projectsService.delete(id)
  }
}
