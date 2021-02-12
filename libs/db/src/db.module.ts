import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './models/user.model';
import { Course } from './models/course.model';
import { Episode } from './models/episode.model';

// 引入模型
const models = TypegooseModule.forFeature([User, Course, Episode]);
@Global() // 全局
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost:27017/linkschool-api', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }),
    models, // 引入
  ],
  providers: [DbService],
  exports: [DbService, models], // 导出
})
export class DbModule {}
