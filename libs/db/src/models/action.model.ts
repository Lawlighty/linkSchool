// 操作(点赞/收藏等等)
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Course } from './course.model';
import { User } from './user.model';
import { Episode } from './episode.model';

@modelOptions({
  schemaOptions: {
    timestamps: true, // 模型额外添加 create update time
  },
})
export class Action {
  @ApiProperty({ description: '用户' })
  @IsNotEmpty({ message: '请填写用户名称' })
  @prop({ ref: 'User' })
  user: Ref<User>;

  @ApiProperty({ description: '对象' })
  @prop({ refPath: 'type' }) // 根据type 参考
  object: Ref<Course | Episode>;

  @ApiProperty({ description: '对象类型' })
  @prop({ enum: ['Course', 'Episode'] }) // 只允许
  type: string;

  @ApiProperty({ description: '操作名称' })
  @prop({ enum: ['LIKE', 'UP_VOTE', 'DOWN_VOTE', 'LEARN'] }) // 只允许 收藏/ 点赞/ 不赞 / 学习
  name: string;
}
