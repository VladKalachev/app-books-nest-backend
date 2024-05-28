import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { TokenModule } from './auth/token/token.module';
import { MailModule } from './auth/mail/mail.module';
import { GoalModule } from './goal/goal.module';
import { FileModule } from './file/file.module';
import { GenreModule } from './genre/genre.module';
import { PublishingModule } from './publishing/publishing.module';
import { TelegramModule } from './telegram/telegram.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/api/uploads',
    }),
    ConfigModule.forRoot(),
    AuthorModule,
    BookModule,
    UserModule,
    TokenModule,
    MailModule,
    GoalModule,
    FileModule,
    GenreModule,
    PublishingModule,
    TelegramModule,
    DatabaseModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
