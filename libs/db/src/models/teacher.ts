import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from './user.model';
@modelOptions({
  schemaOptions: {
    timestamps: true, // 模型额外添加 create update time
  },
})
export class Teacher {
  @ApiProperty({ description: '用户' })
  @IsNotEmpty({ message: '请填写关联用户' })
  @prop({ ref: 'User' })
  user: Ref<User>;

  @ApiProperty({ description: '讲师头衔', example: '讲师' })
  @prop()
  tag: string;

  @ApiProperty({ description: '讲师认证信息图片', example: '' })
  @prop()
  certificates: string[];

  @ApiProperty({ description: '是否认证' })
  @prop()
  approve: boolean;
}
