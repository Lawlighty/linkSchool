import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
  app.enableCors(); // 允许跨域
  const config = new DocumentBuilder()
    .setTitle('极客学院后台管理API(管理端))')
    .setDescription('供极客学院调用的服务端API')
    .setVersion('1.0')
    // .addTag('Geek')
    .addBearerAuth() // 启用 token--->swagger使用
    .build();

  app.useGlobalPipes(new ValidationPipe());
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const PORT = process.env.ADMIN_PORT || 3000;
  await app.listen(PORT);
}
bootstrap();
