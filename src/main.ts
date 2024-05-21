import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('My BookModel App')
    .setDescription('REST API for my BookModel App')
    .setVersion('1.0')
    .setBasePath('api')
    .addTag('Users', 'Пользователи')
    .addTag('Books', 'Книги')
    .addTag('Authors', 'Авторы')
    .addTag('Genres', 'Жанры')
    .addTag('Publishing', 'Издательства')
    .addTag('Goals', 'Цели')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(3000);
}
bootstrap();
