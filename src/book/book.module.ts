import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';

@Module({
  controllers: [BookController],
  imports: [],
  providers: [BookService],
})
export class BookModule {}