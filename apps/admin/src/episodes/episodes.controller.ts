import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { ModelType, ReturnModelType } from '@typegoose/typegoose/lib/types';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { IsNotEmpty } from 'class-validator';
import { Episode } from '@libs/db/models/episode.model';
import { Course } from '@libs/db/models/course.model';
import { Post } from '@typegoose/typegoose';

@Crud({
  model: Episode,
  routes: {
    // get
    find: {
      decorators: [ApiOperation({ summary: '查询课时列表' })],
    },
    // get:id
    findOne: {
      decorators: [ApiOperation({ summary: '查看课时详情' })],
    },
    // post
    create: {
      decorators: [ApiOperation({ summary: '创建课时' })],
      //   dto: CreateUserDto,
    },
    // put
    update: {
      decorators: [ApiOperation({ summary: '更新课时' })],
      //   dto: CreateUserDto,
    },
    // delete:id
    delete: {
      decorators: [ApiOperation({ summary: '删除课时' })],
    },
  },
})
@Controller('episodes')
@ApiTags('课时')
export class EpisodesController {
  constructor(
    @InjectModel(Episode) private readonly model: ModelType<Episode>,
    @InjectModel(Course) private readonly courseModel: ModelType<Course>,
  ) {}

  @Get('updatecourse')
  @ApiOperation({ summary: '编辑帖子' })
  async updatecourse(@Query() query) {
    const episodesList = await this.model.find(query);
    // .update({ _id: item._id }, { $set: { payType: '1' } });
    return {};
  }
}
