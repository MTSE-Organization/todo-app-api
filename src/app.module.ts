//#region import
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { AccountModule } from './modules/account/account.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { sequelizeConfig } from './config/sequelize.config';
import { GroupModule } from './modules/group/group.module';
import { PermissionModule } from './modules/permission/permission.module';
import { StartTimingMiddleware } from './common/middlewares/start-timing.middleware';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './config';
import { FileModule } from './modules/file/file.module';
import { TodosModule } from './modules/todos/todos.module';
//#endregion

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync(sequelizeConfig),
    JwtModule.registerAsync(jwtConfig),
    AuthModule,
    AccountModule,
    GroupModule,
    PermissionModule,
    FileModule,
    TodosModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(StartTimingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
