import { Course } from '@libs/db/models/course.model';
import { Study } from '@libs/db/models/study.model';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CurrentUser } from 'apps/server/auth/current-user.decorater';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Study,
  routes: {
    // get
    find: {
      populate: ['object'],
      decorators: [ApiOperation({ summary: '查询学习列表' })],
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
@Controller('studys')
@ApiTags('学习操作')
export class StudysController {
  constructor(
    @InjectModel(Study) private readonly model: ModelType<Study>,
    @InjectModel(Course) private readonly courseModel: ModelType<Course>,
  ) {}
  @Get('num')
  @ApiOperation({ summary: '查询学习人数' })
  @ApiBearerAuth()
  async getStatusNum(@Query('query') dto: string) {
    const now_dto = JSON.parse(dto);
    const count = await this.model.countDocuments(now_dto);
    return { count: count || 0 };
  }
  @Get('status')
  @ApiOperation({ summary: '查询' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async getStatus(@Query('query') dto: string, @CurrentUser() user) {
    const now_dto = JSON.parse(dto);
    now_dto.user = user._id;
    const count = await this.model.countDocuments(now_dto);
    return { status: count > 0 };
  }
  @Post('toogle')
  @ApiOperation({ summary: '切换' })
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async toogle(@Body() dto, @CurrentUser() user) {
    const query = dto['query'] || '{}';
    const res = await this.getStatus(query, user);
    const newdto = JSON.parse(query);
    newdto.user = user._id;
    if (res.status) {
      // 有数据---> 删除
      await this.model.deleteMany(newdto);
    } else {
      // 无数据---> 创建
      if (newdto.type === 'Course' && newdto.object) {
        // 查询子课程 插入记录
        const course_res = await this.courseModel.findById(newdto.object);
        console.log('course_res', course_res);
        if (course_res.episodes.length > 0) {
          newdto['location'] = course_res.episodes[0];
          await this.model.create(newdto);
        } else {
          await this.model.create(newdto);
        }
      } else {
        await this.model.create(newdto);
      }
    }
    return await this.getStatus(query, user);
  }
}
