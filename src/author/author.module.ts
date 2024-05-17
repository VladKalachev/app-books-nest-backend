import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [AuthorController],
  imports: [DatabaseModule],
  providers: [AuthorService],
})
export class AuthorModule {}
