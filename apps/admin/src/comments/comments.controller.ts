import { Body, Controller, Get, Post, UseGuards, Query } from '@nestjs/common';
import { ModelType, Ref } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { Comment } from '@libs/db/models/comment.model';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../auth/current-user.decorater';
import { Course } from '@libs/db/models/course.model';
import { Episode } from '@libs/db/models/episode.model';
import { User } from '@libs/db/models/user.model';

class CommentCreateDto {
  @ApiProperty({ description: '用户' })
  user: Ref<User>;

  @ApiProperty({ description: '对象' })
  //   object: Ref<Course | Episode | Document>;
  object: string;

  @ApiProperty({ description: '对象类型' })
  type: string;

  @ApiProperty({ description: '评论内容' })
  content: string;

  @ApiProperty({ description: '回复评论对象' })
  replayto: Ref<Comment>;
}
@Controller('comments')
@ApiTags('评论')
export class CommentsController {
  constructor(
    @InjectModel(Comment) private readonly model: ModelType<Comment>,
  ) {}

  @Get()
  @ApiOperation({ summary: '获取评论列表' })
  async index(@Query('query') query: string) {
    //   async index() {
    // const params = JSON.parse(query);
    // const params = JSON.parse(query);
    return await this.model.find().populate('user');
    //   .where(params.where)
    //   .setOptions(params);
  }

  @Post()
  @ApiOperation({ summary: '添加评论' })
  //   @UseGuards(AuthGuard('jwt'))
  async create(@Body() dto: CommentCreateDto, @CurrentUser() user) {
    // dto.user = user._id; // 评论发布人为登录人id(防止user篡改)
    return await this.model.create(dto);
  }
}
