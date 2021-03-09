import { User } from '@libs/db/models/user.model';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { CurrentUser } from './current-user.decorater';
import { UpdateUserDto } from './dto/updateUser.dto';
// export class RegisterDto {
//   @ApiProperty({ description: '用户名', example: '用户名' })
//   username: string;
//   @ApiProperty({ description: '密码', example: '密码' })
//   password: string;
// }

@Controller('auth')
@ApiTags('用户')
export class AuthController {
  constructor(
    private JwtService: JwtService,
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  @Post('register')
  @ApiOperation({ summary: '注册' })
  async Register(@Body() dto: RegisterDto) {
    const { username, password, ref_code } = dto;
    const user_check = await this.userModel.findOne({ username: username });
    if (!user_check) {
      // 创建用户
      const new_user = {
        username,
        password,
        ref_code,
        auth: 'customer',
        nickname: username,
        gender: 2,
        avatar:
          'https://static-dev.roncoo.com/course/0948d9f30817454ea5386118fe1ac20a.jpg',
        introduc: '',
        tags: [],
        email: '',
        other1: '',
        other2: '',
      };

      const user = await this.userModel.create(new_user);
      return user;
    }
    return { status: 400, message: '该用户名已经注册!' };
  }

  @Post('login')
  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local')) // 策略 守卫
  async Login(@Body() dto: LoginDto, @CurrentUser() user: DocumentType<User>) {
    // async Login(@Body() dto: LoginDto, @Req() req) {
    // console.log('调用登录');
    // console.log('user==>', user);
    // console.log('user._id==>', user._id);
    // console.log('token==>', this.JwtService.sign(user.toJSON()));
    return {
      status: 200,
      user: user.toJSON(),
      token: this.JwtService.sign({ _id: String(user._id) }), // 生成token 签名
      // token: this.JwtService.sign(user.toJSON()), // 生成token 签名
    };
  }

  @Get('user')
  @ApiOperation({ summary: '获取用户信息' })
  @UseGuards(AuthGuard('jwt')) // 策略 守卫
  @ApiBearerAuth()
  // async user(@Req() req) {

  // 自定义 装饰器获取user
  async user(@CurrentUser() user: DocumentType<User>) {
    return user;
  }

  @Put(':id')
  @ApiOperation({ summary: '修改个人信息' })
  async UpdateUserInfo(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return await this.userModel.findByIdAndUpdate(id, dto, { new: true });
    // return await this.userModel.update({ _id: id }, dto);
  }
}
