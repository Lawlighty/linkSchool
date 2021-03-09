import { DbModule } from '@libs/db';
// import { DbModule } from '../../../libs/db';
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { EpisodesModule } from './episodes/episodes.module';
import { MulterModule } from '@nestjs/platform-express';
import { CommonModule } from 'y/common';
import { AuthModule } from './auth/auth.module';
import { TagsModule } from './tags/tags.module';
import { BannersModule } from './banners/banners.module';
import { DocumentsModule } from './documents/documents.module';
import { CommentsModule } from './comments/comments.module';
import { CategorysModule } from './categorys/categorys.module';
import { QuestionsModule } from './questions/questions.module';
import { StatusMonitorModule } from 'nestjs-status-monitor';
const mcx = require('multer-cos-x');
@Module({
  imports: [
    CommonModule,
    StatusMonitorModule.forRoot(), // 服务监控
    // StatusMonitorModule.setUp(statusMonitorConfig),
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
    //   // dest:'upload',// 本地存储
    // }),
    // DbModule,
    UsersModule,
    CoursesModule,
    EpisodesModule,
    AuthModule,
    TagsModule,
    BannersModule,
    DocumentsModule,
    CommentsModule,
    CategorysModule,
    QuestionsModule,
  ], // 引入数据库module
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
