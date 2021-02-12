import { Controller } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { ModelType, ReturnModelType } from '@typegoose/typegoose/lib/types';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { IsNotEmpty } from 'class-validator';
import { Course } from '@libs/db/models/course.model';

@Crud({
  model: Course,
  routes: {
    // get
    find: {
      decorators: [ApiOperation({ summary: '查询课程列表' })],
    },
    // get:id
    findOne: {
      decorators: [ApiOperation({ summary: '查看课程详情' })],
    },
    // post
    create: {
      decorators: [ApiOperation({ summary: '创建课程' })],
      //   dto: CreateUserDto,
    },
    // put
    update: {
      decorators: [ApiOperation({ summary: '更新课程' })],
      //   dto: CreateUserDto,
    },
    // delete:id
    delete: {
      decorators: [ApiOperation({ summary: '删除课程' })],
    },
  },
})
@Controller('courses')
@ApiTags('课程')
export class CoursesController {
  constructor(@InjectModel(Course) private readonly model: ModelType<Course>) {}
}
