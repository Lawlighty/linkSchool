import { Controller, Get } from '@nestjs/common';
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
      populate: 'author',
      decorators: [ApiOperation({ summary: '查看文档详情' })],
    },
    // post
    create: {
      decorators: [ApiOperation({ summary: '创建文档' })],
      //   dto: CreateTagDto,
    },
    // put
    update: {
      decorators: [ApiOperation({ summary: '更新文档' })],
      // dto: CreateUserDto,
    },
    // delete:id
    delete: {
      decorators: [ApiOperation({ summary: '删除文档' })],
    },
  },
})
@Controller('documents')
@ApiTags('文档')
export class DocumentsController {
  constructor(
    @InjectModel(Document) private readonly model: ModelType<Document>,
  ) {}

  // @Get()
  // @ApiOperation({ summary: '获取评论列表' })
  // async index() {
  //   //   async index() {
  //   // const params = JSON.parse(query);
  //   // const params = JSON.parse(query);
  //   return await this.model.find().populate('author');
  //   //   .where(params.where)
  //   //   .setOptions(params);
  // }
}
