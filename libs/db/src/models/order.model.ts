// 订单
import { arrayProp, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from './user.model';
import { Course } from './course.model';
import { Episode } from './episode.model';
import { Document } from './document.model';
import { Svip } from './svip.model';

@modelOptions({
  schemaOptions: {
    timestamps: true, // 模型额外添加 create update time
    toJSON: { virtuals: true }, // 开启虚拟字段
  },
})
export class Order {
  @ApiProperty({ description: '订单用户' })
  @IsNotEmpty({ message: '请填写用户名称' })
  @prop({ ref: 'User' })
  user: Ref<User>;

  @ApiProperty({ description: '对象' })
  @prop({ refPath: 'type' }) // 根据type 参考
  object: Ref<Course | Episode | Document | Svip>;

  @ApiProperty({ description: '对象类型' })
  @prop({ enum: ['Course', 'Episode', 'Document', 'Svip'] }) // 只允许
  type: string;

  @ApiProperty({ description: '支付方式' })
  @prop({ enum: ['wechat', 'alipay'] }) // 只允许
  paytype: string;

  @ApiProperty({ description: '支付状态' })
  @prop()
  paystatus: boolean;
}
