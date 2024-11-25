import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common'
import { InjectKnex, Knex } from 'nestjs-knex'

import { DatabaseTable } from 'src/common/enums/database-table.enum'

import { CreateProjectDTO } from './dtos/create-project.dto'
import { UpdateProjectDTO } from './dtos/update-project.dto'
import { IProject } from './project.interface'

@Injectable()
export class ProjectsService implements OnModuleInit {
  constructor(@InjectKnex() private readonly knex: Knex) {}
  private Project = () => this.knex<IProject>(DatabaseTable.PROJECTS)

  async onModuleInit() {
    await this.initializeTables()
  }

  private async initializeTables() {
    if (!(await this.knex.schema.hasTable(DatabaseTable.PROJECTS))) {
      await this.knex.schema.createTable(DatabaseTable.PROJECTS, (table) => {
        table.increments('id').primary()
        table.integer('org_id')
        table.integer('created_by')

        table
          .foreign('created_by')
          .references('id')
          .inTable(DatabaseTable.USERS)
          .onDelete('CASCADE')

        table
          .foreign('org_id')
          .references('id')
          .inTable(DatabaseTable.ORGANIZATIONS)
          .onDelete('CASCADE')
      })
    }
  }

  public async getAll() {
    return await this.Project().select()
  }

  public async getById(id: number) {
    const user = await this.Project().where({ id: id }).first()

    if (!user) {
      throw new NotFoundException(`User with id = ${id} not found`)
    }

    return user
  }

  public async create(payload: CreateProjectDTO) {
    const [user] = await this.Project().insert(payload).returning('*')

    return user
  }

  public async update(id: number, payload: UpdateProjectDTO) {
    const [user] = await this.Project()
      .where({ id: id })
      .update(payload)
      .returning('*')

    return user
  }

  public async delete(id: number) {
    await this.Project().where({ id }).del()

    return true
  }
}
