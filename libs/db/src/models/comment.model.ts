// 评论
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Course } from './course.model';
import { User } from './user.model';
import { Episode } from './episode.model';
import { Document } from './document.model';
import { Question } from './question.model';

@modelOptions({
  schemaOptions: {
    timestamps: true, // 模型额外添加 create update time
  },
})
export class Comment {
  @ApiProperty({ description: '用户' })
  @IsNotEmpty({ message: '请填写用户名称' })
  @prop({ ref: 'User' })
  user: Ref<User>;

  @ApiProperty({ description: '对象' })
  @prop({ refPath: 'type' }) // 根据type 参考
  object: Ref<Course | Episode | Document | Comment | Question>;

  @ApiProperty({ description: '对象类型' })
  @prop({ enum: ['Course', 'Episode', 'Document', 'Comment', 'Question'] }) // 只允许
  type: string;

  @ApiProperty({ description: '评论内容' })
  @IsNotEmpty({ message: '请填写评论内容' })
  @prop()
  content: string;

  @ApiProperty({ description: '回复评论对象' })
  @prop({ ref: 'Comment' })
  replayto: Ref<Comment>;
}
