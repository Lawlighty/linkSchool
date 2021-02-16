// 标签
import { arrayProp, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

@modelOptions({
  schemaOptions: {
    timestamps: true, // 模型额外添加 create update time
    toJSON: { virtuals: true }, // 开启虚拟字段
  },
})
export class Tag {
  @ApiProperty({ description: '标签名称', example: '标签名称' })
  @IsNotEmpty({ message: '请填写标签名称' })
  @prop()
  name: string;

  @ApiProperty({ description: '标签类型', example: '' })
  @prop()
  type: string;
}
