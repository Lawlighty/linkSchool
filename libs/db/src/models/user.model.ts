import { modelOptions, prop } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { hashSync } from 'bcryptjs';
@modelOptions({
  schemaOptions: {
    timestamps: true, // 模型额外添加 create update time
  },
})
export class User {
  @ApiProperty({ description: '用户名', example: '测试用户' })
  @IsNotEmpty({ message: '请填写用户名' })
  @prop()
  username: string;

  @ApiProperty({ description: '登录密码', example: '123' })
  @IsNotEmpty({ message: '请填写登录密码' })
  @prop({
    select: false, // 常规数据库查询不返回该字段
    // 密码hash--.> 数据库保存之前处理
    get(val) {
      return val;
    },
    set(val) {
      return val ? hashSync(val) : val;
    },
  })
  password: string;
}
