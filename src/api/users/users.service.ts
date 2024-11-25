import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common'
import { InjectKnex, Knex } from 'nestjs-knex'

import { DatabaseTable } from 'src/common/enums/database-table.enum'

import { CreateUserDTO } from './dtos/create-user.dto'
import { UpdateUserDTO } from './dtos/update-user.dto'
import { IUser } from './user.interface'

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(@InjectKnex() private readonly knex: Knex) {}
  private User = () => this.knex<IUser>(DatabaseTable.USERS)

  async onModuleInit() {
    await this.initializeTables()
  }

  private async initializeTables() {
    if (!(await this.knex.schema.hasTable(DatabaseTable.USERS))) {
      await this.knex.schema.createTable(DatabaseTable.USERS, (table) => {
        table.increments('id').primary()
        table.string('name')
        table.string('role')
        table.integer('created_by').nullable()
      })
    }
  }

  public async getAll() {
    return await this.User().select()
  }

  public async getById(id: number) {
    const user = await this.User().where({ id: id }).first()

    if (!user) {
      throw new NotFoundException(`User with id = ${id} not found`)
    }

    return user
  }

  public async create(payload: CreateUserDTO) {
    const [user] = await this.User().insert(payload).returning('*')

    return user
  }

  public async update(id: number, payload: UpdateUserDTO) {
    const [user] = await this.User()
      .where({ id: id })
      .update(payload)
      .returning('*')

    return user
  }

  public async delete(id: number) {
    await this.User().where({ id }).del()

    return true
  }
}
