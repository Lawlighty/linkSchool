import { Course } from '@libs/db/models/course.model';
import { Episode } from '@libs/db/models/episode.model';
import { Comment } from '@libs/db/models/comment.model';
import { User } from '@libs/db/models/user.model';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiProperty, ApiTags, ApiOperation } from '@nestjs/swagger';
import { Ref } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { CurrentUser } from 'apps/server/auth/current-user.decorater';
import { InjectModel } from 'nestjs-typegoose';
import { AuthGuard } from '@nestjs/passport';
import { Crud } from 'nestjs-mongoose-crud';

class CommentCreateDto {
  @ApiProperty({ description: '用户' })
  user: Ref<User>;

  @ApiProperty({ description: '对象' })
  // object: Ref<Course | Episode | Document>;
  object: Ref<Course | Episode | Document | Comment>;

  @ApiProperty({ description: '对象类型' })
  type: string;

  @ApiProperty({ description: '评论内容' })
  content: string;

  @ApiProperty({ description: '回复评论对象' })
  replayto: Ref<Comment>;
}

@Crud({
  model: Comment,
  routes: {
    // get
    find: {
      populate: ['user', 'comment'],
      sort: '-createdAt',
      decorators: [ApiOperation({ summary: '查询评论列表' })],
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
@Controller('comments')
@ApiTags('评论')
export class CommentsController {
  constructor(
    @InjectModel(Comment) private readonly model: ModelType<Comment>,
  ) {}
  //   @Get()
  //   @ApiOperation({ summary: '获取评论列表' })
  //   async index(@Query('query') query: string) {
  //     //   async index() {
  //     // const params = JSON.parse(query);
  //     // const params = JSON.parse(query);
  //     return await this.model.find().populate('user');
  //     //   .where(params.where)
  //     //   .setOptions(params);
  //   }

  @Post()
  @ApiOperation({ summary: '添加评论' })
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() dto, @CurrentUser() user) {
    dto.user = user._id; // 评论发布人为登录人id(防止user篡改)
    return await this.model.create(dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除评论' })
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id: string, @CurrentUser() user) {
    // dto.user = user._id; // 评论发布人为登录人id(防止user篡改)
    return this.model.findByIdAndDelete(id);
  }
}
