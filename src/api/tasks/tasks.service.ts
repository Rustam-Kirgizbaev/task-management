import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common'
import { InjectKnex, Knex } from 'nestjs-knex'

import { DatabaseTable } from 'src/common/enums/database-table.enum'
import { TaskStatus } from 'src/common/enums/task-status.enum'

import { IProject } from '../projects/project.interface'
import { CreateTaskDTO } from './dtos/create-task.dto'
import { UpdateTaskDTO } from './dtos/update-task.dto'
import { ITask } from './tasks.interface'

@Injectable()
export class TasksService implements OnModuleInit {
  constructor(@InjectKnex() private readonly knex: Knex) {}
  private Task = () => this.knex<ITask>(DatabaseTable.TASKS)
  private Project = () => this.knex<IProject>(DatabaseTable.PROJECTS)

  async onModuleInit() {
    await this.initializeTables()
  }

  private async initializeTables() {
    if (!(await this.knex.schema.hasTable(DatabaseTable.TASKS))) {
      await this.knex.schema.createTable(DatabaseTable.TASKS, (table) => {
        table.increments('id').primary()
        table
          .enum('status', Object.values(TaskStatus))
          .defaultTo(TaskStatus.CREATED)
        table.integer('worker_user_id')
        table.integer('created_by')
        table.integer('project_id')
        table.date('due_date').nullable()
        table.date('created_at').defaultTo(this.knex.fn.now())
        table.date('done_at').nullable()

        table
          .foreign('project_id')
          .references('id')
          .inTable(DatabaseTable.PROJECTS)
          .onDelete('CASCADE')
      })
    }
  }

  public async getAll() {
    return await this.Task().select()
  }

  public async getById(id: number) {
    const task = await this.Task().where({ id: id }).first()

    if (!task) {
      throw new NotFoundException(`Task with id = ${id} not found`)
    }

    return task
  }

  public async listOrganizationTasks(org_id: number) {
    const projects = await this.Project().where({ org_id }).select('id')
    const tasks = await this.Task()
      .whereIn(
        'project_id',
        projects.map((p) => p.id),
      )
      .select('project_id')
      .select(this.knex.raw('json_agg(tasks.*) as tasks'))
      .groupBy('project_id')

    return tasks
  }

  public async listUserTasks(user_id: number, group_by: 'project' | 'status') {
    const selector = group_by === 'project' ? 'project_id' : group_by

    const tasks = await this.Task()
      .where({ worker_user_id: user_id })
      .select(selector)
      .select(this.knex.raw('json_agg(tasks.*) as tasks'))
      .groupBy(selector)

    return tasks
  }

  public async create(payload: CreateTaskDTO) {
    const [task] = await this.Task()
      .insert({
        status: TaskStatus.CREATED,
        created_at: new Date(),
        ...payload,
      })
      .returning('*')

    return task
  }

  public async update(id: number, payload: UpdateTaskDTO) {
    const update_payload = { done_at: null, ...payload }

    if (payload.status && payload.status === TaskStatus.DONE) {
      update_payload.done_at = new Date()
    }

    const [task] = await this.Task()
      .where({ id: id })
      .update(update_payload)
      .returning('*')

    return task
  }

  public async delete(id: number) {
    await this.Task().where({ id }).del()

    return true
  }
}
