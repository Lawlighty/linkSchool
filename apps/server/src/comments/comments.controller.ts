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
    @InjectModel(User) private readonly userModel: ModelType<User>,
  ) {}
  @Get('deep')
  @ApiOperation({ summary: '获取深层评论列表' })
  async index(@Query('query') query: string) {
    const dto = JSON.parse(query);

    //   async index() {
    // const params = JSON.parse(query);
    // const params = JSON.parse(query);
    const returnList = await this.model
      .find(dto)
      .populate(['user', 'replayto']);
    // returnList.map((item) => {
    //   console.log('现在的item', item);
    //   if (item.replayto) {
    //     console.log('查询replayto 的user');
    //     // (async () => {
    //     //   const cccuser = await this.userModel.findById(item.replayto['user']);
    //     //   console.log('cccuser 的user', cccuser);
    //     //   item.replayto['user'] = cccuser;
    //     // })();
    //     const userInfo = await this.getUserInfo(item.replayto['user']);
    //   }
    // });
    for (let i = 0; i < returnList.length; i++) {
      if (returnList[i].replayto) {
        const item = returnList[i];
        console.log('查询replayto 的user');
        const userInfo = await this.userModel.findById(item.replayto['user']);
        returnList[i]['replayto']['user'] = userInfo;
      }
    }
    console.log('returnList', returnList);
    return returnList;
    // .populate(['user', 'replayto'])
    // .populate(['user']);
    //   .where(params.where)
    //   .setOptions(params);
  }

  @Get('aa')
  @ApiOperation({ summary: '获取user' })
  async getUserInfo(@Query('id') id: string) {
    return await this.userModel.findById(id);
  }

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
