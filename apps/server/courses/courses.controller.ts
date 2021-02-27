import { Course } from '@libs/db/models/course.model';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Course,
  routes: {
    // get
    find: {
      populate: ['author', 'category', 'episodes'],
      decorators: [ApiOperation({ summary: '查询课程列表' })],
    },
    // get:id
    findOne: {
      populate: ['author', 'category', 'episodes'],
      decorators: [ApiOperation({ summary: '查看课程详情' })],
    },
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
  constructor(@InjectModel(Course) private readonly model: ModelType<Course>) {}
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
}
