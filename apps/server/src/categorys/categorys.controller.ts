import { Category } from '@libs/db/models/category.model';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';

@Controller('categorys')
@ApiTags('分类')
export class CategorysController {
  constructor(
    @InjectModel(Category) private readonly model: ModelType<Category>,
  ) {}
  @Get()
  @ApiOperation({ summary: '获取分类' })
  async index() {
    return await this.model.find();
  }
}
