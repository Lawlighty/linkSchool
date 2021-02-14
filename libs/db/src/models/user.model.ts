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
  // @IsNotEmpty({ message: '请填写登录密码' })
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

  @ApiProperty({ description: '推荐码', example: '' })
  @prop()
  ref_code: string;

  @ApiProperty({ description: '权限', example: 'customer' }) // customer: 普通用户, admin:管理员
  @prop()
  auth: string;

  @ApiProperty({ description: '昵称', example: '' })
  @prop()
  nickname: string;

  @ApiProperty({ description: '性别', example: 0 }) // 0:男 1:女 2:保密
  @prop()
  gender: number;

  @ApiProperty({ description: '头像', example: '' })
  @prop()
  avatar: string;

  @ApiProperty({ description: '默认字段1', example: '' })
  @prop()
  other1: string;

  @ApiProperty({ description: '默认字段2', example: '' })
  @prop()
  other2: string;
}
