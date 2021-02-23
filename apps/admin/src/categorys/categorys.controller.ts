import { Category } from '@libs/db/models/category.model';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiProperty, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ModelType, Ref } from '@typegoose/typegoose/lib/types';
import { IsNotEmpty } from 'class-validator';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

class CreateCategoryDto {
  @ApiProperty({ description: '类型名称', example: '类型名称' })
  @IsNotEmpty({ message: '请填写类型名称' })
  name: string;

  @ApiProperty({ description: '类型描述', example: '' })
  describe: string;

  @ApiProperty({ description: '对象类型' })
  type: string;

  @ApiProperty({ description: '类型父级' })
  parentid: Ref<Category>;
}

@Crud({
  model: Category,
  routes: {
    // get
    find: {
      populate: 'parentid',
      decorators: [ApiOperation({ summary: '查询标签列表' })],
    },
    // get:id
    findOne: {
      decorators: [ApiOperation({ summary: '查看标签详情' })],
    },
    // post
    create: {
      decorators: [ApiOperation({ summary: '创建标签' })],
      dto: CreateCategoryDto,
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
@Controller('categorys')
@ApiTags('类型')
export class CategorysController {
  constructor(
    @InjectModel(Category) private readonly model: ModelType<Category>,
  ) {}

  @Post()
  @ApiOperation({ summary: '创建我的类型' })
  async Create(@Body() dto: CreateCategoryDto) {
    const category = await this.model.findOne({ name: dto.name });
    if (!category) {
      await this.model.create(dto);
      return { status: 200, message: '创建成功' };
    }

    return { status: 400, message: '标签已经存在' };
  }
}
