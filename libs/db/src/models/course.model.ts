// 课程
import { arrayProp, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Episode } from './episode.model';

@modelOptions({
  schemaOptions: {
    timestamps: true, // 模型额外添加 create update time
  },
})
export class Course {
  @ApiProperty({ description: '课程名称', example: '课程名称' })
  @IsNotEmpty({ message: '请填写课程名称' })
  @prop()
  name: string;

  @ApiProperty({ description: '课程封面图', example: '' })
  @prop()
  cover: string;

  @ApiProperty({ description: '课时', example: [] })
  @arrayProp({ itemsRef: 'Episode' })
  episodes: Ref<Episode>[];
}
