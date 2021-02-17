import { Tag } from '@libs/db/models/tag.model';
import { User } from '@libs/db/models/user.model';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { IsNotEmpty } from 'class-validator';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

class CreateTagDto {
  @ApiProperty({ description: '标签名称', example: '标签名称' })
  @IsNotEmpty({ message: '请填写标签名称' })
  name: string;

  @ApiProperty({ description: '标签类型', example: '' })
  type: string;
}
@Crud({
  model: Tag,
  routes: {
    // get
    find: {
      decorators: [ApiOperation({ summary: '查询标签列表' })],
    },
    // get:id
    findOne: {
      decorators: [ApiOperation({ summary: '查看标签详情' })],
    },
    // post
    create: {
      decorators: [ApiOperation({ summary: '创建标签' })],
      dto: CreateTagDto,
    },
    // put
    update: {
      decorators: [ApiOperation({ summary: '更新标签' })],
      // dto: CreateUserDto,
    },
    // delete:id
    delete: {
      decorators: [ApiOperation({ summary: '删除标签' })],
    },
  },
})
@Controller('tags')
@ApiTags('标签')
export class TagsController {
  constructor(@InjectModel(Tag) private readonly model: ModelType<Tag>) {}

  @Post()
  @ApiOperation({ summary: '创建我的标签' })
  async Create(@Body() dto: CreateTagDto) {
    const tag = await this.model.findOne({ name: dto.name });
    if (!tag) {
      await this.model.create(dto);
      return { status: 200, message: '创建成功' };
    }

    return { status: 400, message: '标签已经存在' };
  }
}
