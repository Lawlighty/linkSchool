import { Module } from '@nestjs/common';
import { StudysController } from './studys.controller';

@Module({
  controllers: [StudysController]
})
export class StudysModule {}
