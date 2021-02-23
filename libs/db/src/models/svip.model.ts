// svip
import { arrayProp, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from './user.model';

@modelOptions({
  schemaOptions: {
    timestamps: true, // 模型额外添加 create update time
    toJSON: { virtuals: true }, // 开启虚拟字段
  },
})
export class Svip {
  @ApiProperty({ description: '会员用户' })
  @IsNotEmpty({ message: '请填写用户名称' })
  @prop({ ref: 'User' })
  user: Ref<User>;

  @ApiProperty({ description: '生效日期', example: '' })
  @IsNotEmpty({ message: '请填写生效日期' })
  @prop()
  starttime: string;

  @ApiProperty({ description: '截至日期', example: '' })
  @IsNotEmpty({ message: '请填写截至日期' })
  @prop()
  endtime: string;

  @ApiProperty({ description: '会员类型', example: '' })
  @prop()
  type: string;
}
