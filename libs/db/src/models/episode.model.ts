// 课时
import { modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Course } from './course.model';

@modelOptions({
  schemaOptions: {
    timestamps: true, // 模型额外添加 create update time
  },
})
export class Episode {
  @ApiProperty({ description: '课时名称', example: '课时名称' })
  @IsNotEmpty({ message: '请填写课时名称' })
  @prop()
  name: string;

  @ApiProperty({ description: '课时文件', example: '' })
  @prop()
  file: string;

  @ApiProperty({ description: '所属课程', example: '' })
  @IsNotEmpty({ message: '请填写所属课程' })
  @prop({ ref: 'Course' })
  course: Ref<Course>;
}
