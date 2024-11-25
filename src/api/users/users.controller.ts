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

import { CreateUserDTO } from './dtos/create-user.dto'
import { UpdateUserDTO } from './dtos/update-user.dto'
import { UsersService } from './users.service'

@ApiTags('Users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  async getAll() {
    return await this.usersService.getAll()
  }

  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'id of the needed user',
  })
  @Get('/:id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.getById(id)
  }

  @Post('/')
  async create(@Body() payload: CreateUserDTO) {
    return await this.usersService.create(payload)
  }

  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'id of the needed user',
  })
  @Patch('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDTO,
  ) {
    return await this.usersService.update(id, payload)
  }

  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'id of the needed user',
  })
  @Delete('/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.delete(id)
  }
}
