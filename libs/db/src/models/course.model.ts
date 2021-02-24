// 课程
import { arrayProp, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Episode } from './episode.model';
import { User } from './user.model';
import { Category } from './category.model';

@modelOptions({
  schemaOptions: {
    timestamps: true, // 模型额外添加 create update time
    toJSON: { virtuals: true }, // 开启虚拟字段
  },
})
export class Course {
  @ApiProperty({ description: '课程名称', example: '课程名称' })
  @IsNotEmpty({ message: '请填写课程名称' })
  @prop()
  name: string;

  @ApiProperty({ description: '课程封面图', example: '' })
  @prop()
  cover: string;

  @ApiProperty({ description: '课程介绍', example: '' })
  @prop()
  introduce: string;

  @ApiProperty({ description: '课程价格' })
  @prop()
  price: number;

  @ApiProperty({ description: '课程SVIP价格' })
  @prop()
  sprice: number;

  @ApiProperty({ description: '是否推荐', example: false })
  @prop()
  recommend: boolean;

  @ApiProperty({ description: '是否置顶', example: false })
  @prop()
  stick: boolean;

  @ApiProperty({ description: '课程作者', example: '' })
  @prop({
    ref: 'User',
    // localField: '_id',
    // foreignField: '_id',
  })
  author: Ref<User>;

  @ApiProperty({ description: '文档分类', example: '' })
  @prop({ ref: 'Category' })
  category: Ref<Category>;

  @ApiProperty({ description: '课时', example: [] })
  @prop({
    ref: 'Episode',
    // localField: '_id', // Course类的本地键
    // foreignField: 'course', // 与Episode的course进行关联
  })
  episodes: Ref<Episode>[];
}
