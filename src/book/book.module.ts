import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { DatabaseModule } from 'src/database/database.module';
import { FileModule } from 'src/file/file.module';
import { TokenModule } from 'src/auth/token/token.module';

@Module({
  controllers: [BookController],
  imports: [DatabaseModule, FileModule, TokenModule],
  providers: [BookService],
})
export class BookModule {}
