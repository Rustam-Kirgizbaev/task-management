import { Injectable } from '@nestjs/common'
import { InjectKnex, Knex } from 'nestjs-knex'

import { DatabaseTable } from 'src/common/enums/database-table.enum'

import { IOrganization } from '../organizations/organization.interface'
import { IProject } from '../projects/project.interface'
import { ITask } from '../tasks/tasks.interface'

@Injectable()
export class AdminService {
  constructor(@InjectKnex() private readonly knex: Knex) {}
  private Organization = () =>
    this.knex<IOrganization>(DatabaseTable.ORGANIZATIONS)
  private Project = () => this.knex<IProject>(DatabaseTable.PROJECTS)
  private Task = () => this.knex<ITask>(DatabaseTable.TASKS)

  async getOrganizationStats() {
    const stats = await this.knex(`${DatabaseTable.ORGANIZATIONS} as org`)
      .leftJoin(`${DatabaseTable.PROJECTS} as proj`, 'org.id', 'proj.org_id')
      .leftJoin(`${DatabaseTable.TASKS} as task`, 'proj.id', 'task.project_id')
      .groupBy('org.id', 'org.name')
      .select([
        'org.id as organization_id',
        'org.name as organization_name',
        this.knex.raw('COUNT(DISTINCT proj.id) as project_count'),
        this.knex.raw('COUNT(DISTINCT task.id) as task_count'),
      ])
      .orderBy('org.name')

    return stats
  }

  async getOrganizationProjectStats() {
    const stats = await this.knex.raw(`
        SELECT 
            org.id as organization_id,
            org.name as organization_name,
            COALESCE(
                (
                    SELECT json_agg(project_stats)
                    FROM (
                        SELECT 
                            proj.id as project_id,
                            COUNT(task.id) as task_count
                        FROM ${DatabaseTable.PROJECTS} proj
                        LEFT JOIN ${DatabaseTable.TASKS} task ON task.project_id = proj.id
                        WHERE proj.org_id = org.id
                        GROUP BY proj.id
                    ) project_stats
                ),
                '[]'
            ) as projects
        FROM ${DatabaseTable.ORGANIZATIONS} org
        GROUP BY org.id, org.name
        ORDER BY org.name
    `)

    return stats.rows
  }

  async getOverallCounts() {
    const stats = await this.knex
      .select([
        this.knex.raw(
          `(SELECT COUNT(*) FROM ${DatabaseTable.ORGANIZATIONS}) as organization_count`,
        ),
        this.knex.raw(
          `(SELECT COUNT(*) FROM ${DatabaseTable.PROJECTS}) as project_count`,
        ),
        this.knex.raw(
          `(SELECT COUNT(*) FROM ${DatabaseTable.TASKS}) as task_count`,
        ),
      ])
      .first()

    return stats
  }
}
