import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // 允许跨域
  const config = new DocumentBuilder()
    .setTitle('极客学院后台管理API(客户端)')
    .setDescription('供极客学院网站/APP/小程序调用的服务端API')
    .setVersion('1.0')
    // .addTag('Geek')
    .addBearerAuth() // 启用 token--->swagger使用
    .build();

  app.useGlobalPipes(new ValidationPipe());
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const PORT = process.env.SERVER_PORT || 3008;
  await app.listen(PORT);
}
bootstrap();
