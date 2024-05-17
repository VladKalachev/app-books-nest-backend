import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [BookController],
  imports: [DatabaseModule],
  providers: [BookService],
})
export class BookModule {}
