import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common'
import { InjectKnex, Knex } from 'nestjs-knex'

import { DatabaseTable } from 'src/common/enums/database-table.enum'

import { CreateOrganizationUserDTO } from './dtos/create-organization-user.dto'
import { UpdateOrganizationUserDTO } from './dtos/update-organization-user.dto'
import { IOrganizationUser } from './organization-user.interface'

@Injectable()
export class OrganizationUsersService implements OnModuleInit {
  constructor(@InjectKnex() private readonly knex: Knex) {}
  private OrganizationUser = () =>
    this.knex<IOrganizationUser>(DatabaseTable.ORGANIZATIONUSERS)

  async onModuleInit() {
    await this.initializeTables()
  }

  private async initializeTables() {
    if (!(await this.knex.schema.hasTable(DatabaseTable.ORGANIZATIONUSERS))) {
      await this.knex.schema.createTable(
        DatabaseTable.ORGANIZATIONUSERS,
        (table) => {
          table.increments('id').primary()
          table.integer('org_id')
          table.integer('user_id')

          table
            .foreign('org_id')
            .references('id')
            .inTable(DatabaseTable.ORGANIZATIONS)
            .onDelete('CASCADE')

          table
            .foreign('user_id')
            .references('id')
            .inTable(DatabaseTable.USERS)
            .onDelete('CASCADE')
        },
      )
    }
  }

  public async getAll() {
    return await this.OrganizationUser().select()
  }

  public async getById(id: number) {
    const organization_user = await this.OrganizationUser()
      .where({ id: id })
      .first()

    if (!organization_user) {
      throw new NotFoundException(`User with id = ${id} not found`)
    }

    return organization_user
  }

  public async create(payload: CreateOrganizationUserDTO) {
    const [organization_user] = await this.OrganizationUser()
      .insert(payload)
      .returning('*')

    return organization_user
  }

  public async update(id: number, payload: UpdateOrganizationUserDTO) {
    const [organization_user] = await this.OrganizationUser()
      .where({ id: id })
      .update(payload)
      .returning('*')

    return organization_user
  }

  public async delete(id: number) {
    await this.OrganizationUser().where({ id }).del()

    return true
  }
}
