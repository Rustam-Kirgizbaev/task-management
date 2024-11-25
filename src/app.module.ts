import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { KnexModule } from 'nestjs-knex'

import { AdminModule } from './api/admin/admin.module'
import { OrganizationUsersModule } from './api/organization-users/organization-users.module'
import { OrganizationsModule } from './api/organizations/organizations.module'
import { ProjectsModule } from './api/projects/projects.module'
import { TasksModule } from './api/tasks/tasks.module'
import { UsersModule } from './api/users/users.module'
import configuration from './config'

@Module({
  imports: [
    ConfigModule.forRoot(configuration),
    KnexModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        config: {
          client: 'pg',
          useNullAsDefault: true,
          connection: {
            host: configService.get('database.host'),
            port: configService.get('database.port'),
            user: configService.get('database.user'),
            password: configService.get('database.password'),
            database: configService.get('database.name'),
          },
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    OrganizationsModule,
    ProjectsModule,
    TasksModule,
    OrganizationUsersModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
