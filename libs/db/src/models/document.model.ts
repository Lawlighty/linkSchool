// 文档
import { arrayProp, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Episode } from './episode.model';
import { User } from './user.model';

@modelOptions({
  schemaOptions: {
    timestamps: true, // 模型额外添加 create update time
    toJSON: { virtuals: true }, // 开启虚拟字段
  },
})
export class Document {
  @ApiProperty({ description: '文档名称', example: '文档名称' })
  @IsNotEmpty({ message: '请填写文档名称' })
  @prop()
  name: string;

  @ApiProperty({ description: '文档封面图', example: '' })
  @prop()
  cover: string;

  @ApiProperty({ description: '文档介绍', example: '' })
  @prop()
  introduce: string;

  @ApiProperty({ description: '文档内容', example: '' })
  @prop()
  content: string;

  @ApiProperty({ description: '文档价格' })
  @prop()
  price: number;

  @ApiProperty({ description: '文档SVIP价格' })
  @prop()
  sprice: number;

  @ApiProperty({ description: '文档作者', example: '' })
  @arrayProp({
    ref: 'User',
    localField: '_id',
    foreignField: '_id',
  })
  author: Ref<User>[];
}
