import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './models/user.model';
import { Course } from './models/course.model';
import { Episode } from './models/episode.model';
import { Action } from './models/action.model';
import { Banner } from './models/banner.model';

// 引入模型
const models = TypegooseModule.forFeature([
  User,
  Course,
  Episode,
  Action,
  Banner,
]);
@Global() // 全局
@Module({
  imports: [
    TypegooseModule.forRootAsync({
      useFactory() {
        return {
          uri: process.env.DB,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true,
        };
      },
    }),
    // TypegooseModule.forRoot(process.env.DB, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   useFindAndModify: false,
    //   useCreateIndex: true,
    // }),
    models, // 引入
  ],
  providers: [DbService],
  exports: [DbService, models], // 导出
})
export class DbModule {}
