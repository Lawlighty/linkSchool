import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
// import { EpisodesModule } from 'apps/admin/src/episodes/episodes.module';
// import { UsersModule } from 'apps/admin/src/users/users.module';
import { CommonModule } from 'y/common';
import { AuthModule } from '../auth/auth.module';
import { CoursesModule } from '../courses/courses.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    CommonModule,
    MulterModule.registerAsync({
      useFactory: () => {
        return {};
      },
      // 文件上传
      // storage:,
      // dest:'upload',// 本地存储
    }),
    // UsersModule,
    AuthModule,
    CoursesModule,

    // EpisodesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
