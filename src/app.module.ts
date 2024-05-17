import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthorModule } from './author/author.module';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { TokenModule } from './token/token.module';
import { MailModule } from './mail/mail.module';
import { GoalModule } from './goal/goal.module';
import { FileModule } from './file/file.module';
import { GenreModule } from './genre/genre.module';
import { PublishingModule } from './publishing/publishing.module';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
