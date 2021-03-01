import { Episode } from '@libs/db/models/episode.model';
import { Controller } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Episode,
  routes: {
    // get
    find: {
      // populate: ['course'],
      sort: 'createdAt',
      decorators: [ApiOperation({ summary: '查询课时列表' })],
    },
    // get:id
    findOne: {
      decorators: [ApiOperation({ summary: '查看课时详情' })],
    },
    // post
    create: false,
    // put
    update: false,
    // delete:id
    delete: false,
  },
})
@Controller('episodes')
@ApiTags('课时')
export class EpisodesController {
  constructor(
    @InjectModel(Episode) private readonly model: ModelType<Episode>,
  ) {}
}
