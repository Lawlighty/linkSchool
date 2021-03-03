// 问答
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Comment } from './comment.model';
import { User } from './user.model';
import { Category } from './category.model';

@modelOptions({
  schemaOptions: {
    timestamps: true, // 模型额外添加 create update time
  },
})
export class Question {
  @ApiProperty({ description: '问题名称', example: '问题名称' })
  @IsNotEmpty({ message: '请填写问题名称' })
  @prop()
  name: string;

  @ApiProperty({ description: '提问人', example: '' })
  @IsNotEmpty({ message: '请填写提问人' })
  @prop({ ref: 'User' })
  author: Ref<User>;

  @ApiProperty({ description: '类型', example: '' })
  @IsNotEmpty({ message: '请填写问题类型' })
  @prop({ ref: 'Category' })
  category: Ref<Category>;

  @ApiProperty({ description: '内容', example: '' })
  @prop()
  content: string;

  @ApiProperty({ description: '采纳的回答' })
  @prop({ ref: 'Comment' })
  accept: Ref<Comment>;

  @ApiProperty({ description: '浏览量' })
  @prop()
  browse: number;
}
