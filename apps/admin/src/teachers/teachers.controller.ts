import { Teacher } from '@libs/db/models/teacher';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
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
  @Post('toogle')
  @ApiOperation({ summary: '切换' })
  // @UseGuards(AuthGuard('jwt'))
  // @ApiBearerAuth()
  async toogle(@Body() dto) {
    await this.model.updateOne(
      { _id: dto._id },
      { $set: { approve: dto.approve } },
    );
    return await this.model.findById(dto._id);
  }
}
