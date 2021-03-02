import { Module } from '@nestjs/common';
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
const mcx = require('multer-cos-x');

@Module({
  imports: [
    CommonModule,
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

    // EpisodesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
