import { Question } from '@libs/db/models/question.model';
import { Controller } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Question,
  routes: {
    // get
    find: {
      populate: ['user', 'category', 'accept'],
      sort: 'createdAt',
      decorators: [ApiOperation({ summary: '查询问答列表' })],
    },
    // get:id
    findOne: {
      decorators: [ApiOperation({ summary: '查看问答详情' })],
    },
    // post
    create: {
      decorators: [ApiOperation({ summary: '创建问答' })],
      //   dto: CreateUserDto,
    },
    // put
    update: {
      decorators: [ApiOperation({ summary: '更新问答' })],
      //   dto: CreateUserDto,
    },
    // delete:id
    delete: {
      decorators: [ApiOperation({ summary: '删除问答' })],
    },
  },
})
@Controller('questions')
@ApiTags('问答')
export class QuestionsController {
  @InjectModel(Question) private readonly model: ModelType<Question>;
}
