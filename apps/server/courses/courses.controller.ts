import { Course } from '@libs/db/models/course.model';
import { Controller } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

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
}
