import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common'
import { InjectKnex, Knex } from 'nestjs-knex'

import { DatabaseTable } from 'src/common/enums/database-table.enum'

import { CreateOrganizationDTO } from './dtos/create-organization.dto'
import { UpdateOrganizationDTO } from './dtos/update-organization.dto'
import { IOrganization } from './organization.interface'

@Injectable()
export class OrganizationsService implements OnModuleInit {
  constructor(@InjectKnex() private readonly knex: Knex) {}
  private Organization = () =>
    this.knex<IOrganization>(DatabaseTable.ORGANIZATIONS)

  async onModuleInit() {
    await this.initializeTables()
  }

  private async initializeTables() {
    if (!(await this.knex.schema.hasTable(DatabaseTable.ORGANIZATIONS))) {
      await this.knex.schema.createTable(
        DatabaseTable.ORGANIZATIONS,
        (table) => {
          table.increments('id').primary()
          table.string('name')
          table.integer('created_by')

          table
            .foreign('created_by')
            .references('id')
            .inTable(DatabaseTable.USERS)
            .onDelete('CASCADE')
        },
      )
    }
  }

  public async getAll() {
    return await this.Organization().select()
  }

  public async getById(id: number) {
    const user = await this.Organization().where({ id: id }).first()

    if (!user) {
      throw new NotFoundException(`User with id = ${id} not found`)
    }

    return user
  }

  public async create(payload: CreateOrganizationDTO) {
    const [user] = await this.Organization().insert(payload).returning('*')

    return user
  }

  public async update(id: number, payload: UpdateOrganizationDTO) {
    const [user] = await this.Organization()
      .where({ id: id })
      .update(payload)
      .returning('*')

    return user
  }

  public async delete(id: number) {
    await this.Organization().where({ id }).del()

    return true
  }
}
