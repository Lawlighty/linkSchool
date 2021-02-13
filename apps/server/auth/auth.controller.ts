import { User } from '@libs/db/models/user.model';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
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
    const { username, password } = dto;
    // 创建用户
    const user = await this.userModel.create({
      username,
      password,
    });
    return user;
  }

  @Post('login')
  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local')) // 策略 守卫
  // async Login(@Body() dto: LoginDto, @CurrentUser() user: DocumentType<User>) {
  async Login(@Body() dto: LoginDto, @Req() req) {
    return {
      token: this.JwtService.sign(String(req.user._id)), // 生成token 签名
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
}
