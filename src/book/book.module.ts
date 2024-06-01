import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { DatabaseModule } from 'src/database/database.module';
import { FileModule } from 'src/file/file.module';
import { TokenModule } from 'src/auth/token/token.module';
import { ConfigModule } from '@nestjs/config';
import { TelegramModule } from 'src/telegram/telegram.module';

@Module({
  controllers: [BookController],
  imports: [
    DatabaseModule,
    FileModule,
    TokenModule,
    ConfigModule,
    TelegramModule,
  ],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
