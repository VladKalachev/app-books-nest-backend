import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT', 3000);

  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('My BookModel App')
    .setDescription('REST API for my BookModel App')
    .setVersion('1.0')
    .setBasePath('api')
    .addTag('Auth', 'Авторизация')
    .addTag('Users', 'Пользователи')
    .addTag('Books', 'Книги')
    .addTag('Authors', 'Авторы')
    .addTag('Genres', 'Жанры')
    .addTag('Files', 'Файлы')
    .addTag('Publishing', 'Издательства')
    .addTag('Goals', 'Цели')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(port);
}
bootstrap();
