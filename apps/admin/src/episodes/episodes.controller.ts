import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { ModelType, ReturnModelType } from '@typegoose/typegoose/lib/types';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { IsNotEmpty } from 'class-validator';
import { Episode } from '@libs/db/models/episode.model';
import { Course } from '@libs/db/models/course.model';
import { Post } from '@typegoose/typegoose';
import { AuthGuard } from '@nestjs/passport';

@Crud({
  model: Episode,
  routes: {
    // get
    find: {
      populate: ['course'],
      sort: 'createdAt',
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

  @Put('updatepisodes')
  @ApiOperation({ summary: '修改课时的课程字段' })
  // @UseGuards(AuthGuard('jwt'))
  async updatecourse(@Body() dto) {
    const episodeslist = await this.model.updateMany(
      { _id: { $in: dto.idList } },
      { $set: { course: dto.course_id } },
    );
    return { status: 200, data: episodeslist };
  }
}
