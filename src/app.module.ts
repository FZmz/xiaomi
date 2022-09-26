import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './module/admin/admin.module';
import { ApiModule } from './module/api/api.module';
import { DefaultModule } from './module/default/default.module';
import { ToolsService } from './service/tools/tools.service';
import { AdminauthMiddleware } from './middleware/adminauth.middleware';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    AdminModule,
    ApiModule,
    DefaultModule,
    MongooseModule.forRoot(
      'mongodb://xiaomiadmin:123456@127.0.0.1:27017/nestxiaomi',
      {
        useNewUrlParser: true,
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService, ToolsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminauthMiddleware).forRoutes('admin/*');
  }
}
