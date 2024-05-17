import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [GenreController],
  imports: [DatabaseModule],
  providers: [GenreService],
})
export class GenreModule {}
