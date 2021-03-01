import { Action } from '@libs/db/models/action.model';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CurrentUser } from 'apps/admin/src/auth/current-user.decorater';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Action,
  routes: {
    // get
    find: {
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
@Controller('actions')
@ApiTags('用户操作')
export class ActionsController {
  constructor(@InjectModel(Action) private readonly model: ModelType<Action>) {}

  @Get('status')
  @ApiOperation({ summary: '查询' })
  @UseGuards(AuthGuard('jwt'))
  async getStatus(@Query() dto, @CurrentUser() user) {
    dto.user = user._id;
    const count = await this.model.countDocuments(dto);
    return { status: count > 0 };
  }

  @Post('toogle')
  @ApiOperation({ summary: '切换' })
  @UseGuards(AuthGuard('jwt'))
  async toogle(@Body() dto, @CurrentUser() user) {
    dto.user = user._id;
    const res = await this.getStatus(dto, user);
    if (res.status) {
      // 有数据---> 删除
      await this.model.deleteMany(dto);
    } else {
      // 无数据---> 创建
      await this.model.create(dto);
    }
    return await this.getStatus(dto, user);
  }
}
