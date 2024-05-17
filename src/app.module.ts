import { Module } from '@nestjs/common';
import { AuthorController } from './author/author.controller';
import { BookController } from './book/book.controller';
import { GenreController } from './genre/genre.controller';
import { GoalController } from './goal/goal.controller';
import { PublishingController } from './publishing/publishing.controller';
import { UserController } from './user/user.controller';
import { TokenService } from './token/token.service';
import { UserService } from './user/user.service';
import { PublishingService } from './publishing/publishing.service';
import { MailService } from './mail/mail.service';
import { GoalService } from './goal/goal.service';
import { GenreService } from './genre/genre.service';
import { FileService } from './file/file.service';
import { BookService } from './book/book.service';
import { AuthorService } from './author/author.service';

@Module({
  imports: [],
  controllers: [
    AuthorController,
    BookController,
    GenreController,
    GoalController,
    PublishingController,
    UserController,
  ],
  providers: [
    TokenService,
    UserService,
    PublishingService,
    MailService,
    GoalService,
    GenreService,
    FileService,
    BookService,
    AuthorService,
  ],
})
export class AppModule {}
