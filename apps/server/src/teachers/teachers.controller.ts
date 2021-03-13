import { Teacher } from '@libs/db/models/teacher';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CurrentUser } from 'apps/server/auth/current-user.decorater';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Teacher,
  routes: {
    // get
    find: {
      populate: ['user'],
      decorators: [ApiOperation({ summary: '查询动作列表' })],
    },
    // get:id
    findOne: false,
    // post
    create: false,
    // put
    update: false,
    // delete:id
    delete: false,
  },
})
@Controller('teachers')
@ApiTags('讲师')
export class TeachersController {
  constructor(
    @InjectModel(Teacher) private readonly model: ModelType<Teacher>,
  ) {}
  @Get('status')
  @ApiOperation({ summary: '查询' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async getStatus(@CurrentUser() user) {
    const dto = {
      user: user._id,
    };
    return await this.model.findOne(dto);
  }
  @Post('apply')
  @ApiOperation({ summary: '切换' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async toogle(@Body() dto, @CurrentUser() user) {
    const res = await this.getStatus(user);
    console.log('res==>', res);
    dto.user = user._id;
    console.log('dto===>', dto);
    if (res && res._id) {
      // 有数据---> 删除
      const delRes = await this.model.deleteMany({ user: user._id });
      console.log('delResaaa', delRes);
      if (delRes) {
        console.log('delRes==>', delRes);
        dto.approve = false;
        await this.model.create(dto);
      }
    } else {
      // 无数据---> 创建
      dto.approve = false;
      await this.model.create(dto);
    }
    return await this.getStatus(user);
  }
}
