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
const mcx = require('multer-cos-x');
@Module({
  imports: [
    CommonModule,
    // 异步
    MulterModule.registerAsync({
      useFactory: () => {
        return {
          storage: mcx({
            cos: {
              // 必填参数
              SecretId: process.env.COS_SECRET,
              SecretKey: process.env.COS_KEY,
              Bucket: process.env.COS_BUCKET,
              Region: process.env.COS_REGION,
              // onProgress: (progressData) => {
              //   //进度回调函数，回调是一个对象，包含进度信息
              //   console.log('progressData', progressData);
              // },
            },
          }),
        };
      },
    }),
    // MulterModule.register({
    //   // 文件上传
    //   storage: mcx({
    //     cos: {
    //       // 必填参数
    //       // SecretId: process.env.COS_KEY,
    //       // SecretKey: process.env.COS_SECRET,
    //       // Bucket: process.env.COS_BUCKET,
    //       // Region: process.env.COS_REGION,
    //       SecretId: 'AKID1nZyjT1DGC1e4MBB5nPjBalhU5YwuLK7',
    //       SecretKey: 'oJaaKuTs65oLl3886vXv4zbwOyHJsBG2',
    //       Bucket: 'linkschool-1300224703',
    //       Region: 'ap-shanghai',
    //     },
    //   }),
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
  ], // 引入数据库module
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
