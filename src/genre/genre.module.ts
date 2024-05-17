import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';

@Module({
  controllers: [GenreController],
  imports: [],
  providers: [GenreService],
})
export class GenreModule {}
