import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';

@Module({
  controllers: [AuthorController],
  imports: [],
  providers: [AuthorService],
})
export class AuthorModule {}
