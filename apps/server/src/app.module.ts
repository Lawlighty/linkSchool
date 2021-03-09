import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
// import { EpisodesModule } from 'apps/admin/src/episodes/episodes.module';
// import { UsersModule } from 'apps/admin/src/users/users.module';
import { CommonModule } from 'y/common';
import { AuthModule } from '../auth/auth.module';
import { CoursesModule } from '../courses/courses.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActionsModule } from './actions/actions.module';
import { BannersModule } from './banners/banners.module';
import { DocumentsModule } from './documents/documents.module';
import { CategorysModule } from './categorys/categorys.module';
import { QuestionsModule } from './questions/questions.module';
import { EpisodesModule } from './episodes/episodes.module';
import { CommentsModule } from './comments/comments.module';
import { StudysModule } from './studys/studys.module';
import { LoggerMiddleware } from 'libs/middleware/logger.middleware';
import statusMonitorConfig from 'libs/statusMonitor/statusMonitor';
import { StatusMonitorModule } from 'nestjs-status-monitor';
const mcx = require('multer-cos-x');

@Module({
  imports: [
    CommonModule,
    // StatusMonitorModule.setUp(statusMonitorConfig),
    StatusMonitorModule.forRoot(), // 服务监控
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: mcx({
          cos: {
            // 必填参数
            SecretId: process.env.COS_SECRET,
            SecretKey: process.env.COS_KEY,
            Bucket: process.env.COS_BUCKET,
            Region: process.env.COS_REGION,
          },
        }),
        // dest: 'uploads',
      }),
    }),

    // UsersModule,
    AuthModule,
    CoursesModule,
    ActionsModule,
    BannersModule,
    DocumentsModule,
    CategorysModule,
    QuestionsModule,
    EpisodesModule,
    CommentsModule,
    StudysModule,

    // EpisodesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   // 为 hello 路由添加中间件
  //   consumer
  //     .apply(LoggerMiddleware)
  //     // .exclude({ path: 'hello', method: RequestMethod.POST }) // 排除
  //     .forRoutes('banners'); // 根节点
  // }
}
