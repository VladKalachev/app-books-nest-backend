import { Module } from '@nestjs/common';
import { AuthorController } from './author/author.controller';
import { BookController } from './book/book.controller';
import { GenreController } from './genre/genre.controller';
import { GoalController } from './goal/goal.controller';
import { PublishingController } from './publishing/publishing.controller';
import { UserController } from './user/user.controller';

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
  providers: [],
})
export class AppModule {}
