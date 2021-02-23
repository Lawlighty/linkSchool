// 分类
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

@modelOptions({
  schemaOptions: {
    timestamps: true, // 模型额外添加 create update time
  },
})
export class Category {
  @ApiProperty({ description: '类型名称' })
  @IsNotEmpty({ message: '请填写类型名称' })
  @prop()
  name: string;

  @ApiProperty({ description: '类型描述', example: '' })
  @prop()
  describe: string;

  @ApiProperty({ description: '对象类型' })
  @prop({ enum: ['Course', 'Episode', 'Document'] }) // 只允许
  type: string;

  @ApiProperty({ description: '类型父级' })
  @prop({ ref: 'Category' })
  parentid: Ref<Category>;
}
