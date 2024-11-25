import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger'

import { CreateTaskDTO } from './dtos/create-task.dto'
import { UpdateTaskDTO } from './dtos/update-task.dto'
import { TasksService } from './tasks.service'

@ApiTags('Tasks')
@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('/')
  async getAll() {
    return await this.tasksService.getAll()
  }

  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'id of the needed task',
  })
  @Get('/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.tasksService.getById(id)
  }

  @ApiParam({
    name: 'org_id',
    type: 'number',
    required: true,
    description: 'id of the needed organization',
  })
  @Get('/organization/:org_id')
  async getOrganizationTasks(@Param('org_id', ParseIntPipe) org_id: number) {
    return await this.tasksService.listOrganizationTasks(org_id)
  }

  @ApiParam({
    name: 'user_id',
    type: 'number',
    required: true,
    description: 'id of the needed user',
  })
  @ApiQuery({
    name: 'group_by',
    enum: ['project', 'status'],
    required: false,
    description: 'Group tasks by project or status',
  })
  @Get('/user/:user_id')
  async getUserTasks(
    @Param('user_id', ParseIntPipe) user_id: number,
    @Query('group_by') group_by?: 'project' | 'status',
  ) {
    return await this.tasksService.listUserTasks(user_id, group_by)
  }

  @Post('/')
  async create(@Body() payload: CreateTaskDTO) {
    return await this.tasksService.create(payload)
  }

  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'id of the needed task',
  })
  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateTaskDTO,
  ) {
    return await this.tasksService.update(id, payload)
  }

  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'id of the needed task',
  })
  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.tasksService.delete(id)
  }
}
