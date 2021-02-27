import { Banner } from '@libs/db/models/banner.model';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';

@Controller('banners')
@ApiTags('轮播图')
export class BannersController {
  constructor(@InjectModel(Banner) private readonly model: ModelType<Banner>) {}
  @Get()
  @ApiOperation({ summary: '显示轮播图列表' })
  async index() {
    return await this.model.find();
  }
}
