import { Controller } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { Document } from '@libs/db/models/document.model';

@Crud({
  model: Document,
  routes: {
    // get
    find: {
      populate: ['author', 'category'],
      // populate: 'category',
      sort: '-stick',
      decorators: [ApiOperation({ summary: '查询文档列表' })],
    },
    // get:id
    findOne: {
      populate: ['author', 'category'],
      decorators: [ApiOperation({ summary: '查看文档详情' })],
    },
    // post
    create: false,
    // put
    update: false,
    // delete:id
    delete: false,
  },
})
@Controller('documents')
@ApiTags('文档')
export class DocumentsController {
  constructor(
    @InjectModel(Document) private readonly model: ModelType<Document>,
  ) {}
}
