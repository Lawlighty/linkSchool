import { Module } from '@nestjs/common';
import { CategorysController } from './categorys.controller';

@Module({
  controllers: [CategorysController]
})
export class CategorysModule {}
