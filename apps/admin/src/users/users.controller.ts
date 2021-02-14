import { User } from '@libs/db/models/user.model';
import { Controller } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { IsNotEmpty } from 'class-validator';

class CreateUserDto {
  @ApiProperty({ description: '用户名', example: '测试用户' })
  @IsNotEmpty({ message: '请填写用户名' })
  username: string;

  @ApiProperty({ description: '登录密码', example: '123' })
  @IsNotEmpty({ message: '请填写登录密码' })
  password: string;
}

@Crud({
  model: User,
  routes: {
    // get
    find: {
      decorators: [ApiOperation({ summary: '查询用户列表' })],
    },
    // get:id
    findOne: {
      decorators: [ApiOperation({ summary: '查看用户详情' })],
    },
    // post
    create: {
      decorators: [ApiOperation({ summary: '创建用户' })],
      dto: CreateUserDto,
    },
    // put
    update: {
      decorators: [ApiOperation({ summary: '更新用户' })],
      // dto: CreateUserDto,
    },
    // delete:id
    delete: {
      decorators: [ApiOperation({ summary: '删除用户' })],
    },
  },
})
@Controller('users')
@ApiTags('用户')
export class UsersController {
  constructor(@InjectModel(User) private readonly model: ModelType<User>) {}
}
