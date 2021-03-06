import { Question } from '@libs/db/models/question.model';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CurrentUser } from 'apps/admin/src/auth/current-user.decorater';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Question,
  routes: {
    // get
    find: {
      populate: ['author', 'category', 'accept'],
      sort: '-createdAt',
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
  constructor(
    @InjectModel(Question) private readonly model: ModelType<Question>,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: '查看问题详情' })
  // @UseGuards(AuthGuard('jwt'))
  async getQuestionDetail(@Param('id') id: string) {
    const oldQuestion = await this.model
      .findById(id)
      .populate(['author', 'category', 'accept']);
    const browse = oldQuestion.browse || 0;
    await this.model.updateOne({ _id: id }, { $set: { browse: browse + 1 } });
    return await this.model
      .findById(id)
      .populate(['author', 'category', 'accept']);
  }

  @Post()
  @ApiOperation({ summary: '发布问题' })
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() dto, @CurrentUser() user) {
    dto.author = user._id; // 评论发布人为登录人id(防止user篡改)
    return await this.model.create(dto);
  }
  @Post('tobeAccept')
  @ApiOperation({ summary: '采纳答案' })
  @UseGuards(AuthGuard('jwt'))
  async tobeAccept(@Body() dto, @CurrentUser() user) {
    await this.model.updateOne(
      { _id: dto.id },
      { $set: { accept: dto.accept } },
    );
    return await this.model.findById(dto.id);
  }
}
