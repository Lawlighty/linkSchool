import { Action } from '@libs/db/models/action.model';
import { Course } from '@libs/db/models/course.model';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { CurrentUser } from '../auth/current-user.decorater';

@Crud({
  model: Course,
  routes: {
    // get
    find: {
      // populate: ['author', 'category', 'episodes'],
      populate: ['author', 'category'],
      decorators: [ApiOperation({ summary: '查询课程列表' })],
    },
    // get:id
    findOne: false,
    // findOne: {
    //   populate: ['author', 'category', 'episodes'],
    //   decorators: [ApiOperation({ summary: '查看课程详情' })],
    // },
    // post
    create: false,
    // put
    update: false,
    // delete:id
    delete: false,
  },
})
@Controller('courses')
@ApiTags('课程')
export class CoursesController {
  constructor(
    @InjectModel(Course) private readonly model: ModelType<Course>, // @InjectModel(Action) private readonly actionModel: ModelType<Action>,
  ) {}
  @Get('recommend')
  @ApiOperation({ summary: '获取推荐课程列表' })
  async getRecommendCourses(@Query() query) {
    return await this.model.find({ recommend: true }).populate(['author']);
  }

  @Get('stick')
  @ApiOperation({ summary: '获取热门置顶课程列表' })
  async getStickCourses(@Query() query) {
    return await this.model.find({ stick: true }).populate(['author']);
  }
  @Get(':id')
  @ApiOperation({ summary: '查看课程详情' })
  // @UseGuards(AuthGuard('jwt'))
  async getCourseDetail(@Param('id') id: string) {
    const oldCourse = await this.model
      .findById(id)
      .populate(['author', 'category', 'episodes']);
    const browse = oldCourse.browse || 0;
    await this.model.updateOne({ _id: id }, { $set: { browse: browse + 1 } });
    return await this.model
      .findById(id)
      .populate(['author', 'category', 'episodes']);
  }
}
