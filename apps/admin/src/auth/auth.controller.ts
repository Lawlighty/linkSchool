import { User } from '@libs/db/models/user.model';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { JwtService } from '@nestjs/jwt';
import { ReturnModelType, DocumentType } from '@typegoose/typegoose';
import { LoginDto } from './dto/login.dto';
import { CurrentUser } from './current-user.decorater';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('auth')
@ApiTags('用户')
export class AuthController {
  constructor(
    private JwtService: JwtService,
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  @Post('login')
  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local')) // 策略 守卫
  async Login(@Body() dto: LoginDto, @CurrentUser() user: DocumentType<User>) {
    return {
      status: 200,
      user: user.toJSON(),
      // token: this.JwtService.sign({ _id: String(user._id) }), // 生成token 签名
      token: this.JwtService.sign(user.toJSON()), // 生成token 签名
    };
  }

  @Get('user')
  @ApiOperation({ summary: '获取用户信息' })
  @UseGuards(AuthGuard('jwt')) // 策略 守卫
  @ApiBearerAuth()
  // async user(@Req() req) {

  // 自定义 装饰器获取user
  async user(@CurrentUser() user: DocumentType<User>) {
    return { status: 200, data: user };
  }

  @Put(':id')
  @ApiOperation({ summary: '修改个人信息' })
  async UpdateUserInfo(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    await this.userModel.findByIdAndUpdate(id, dto);
    return { code: 200, message: '更新完成' };
  }
}
