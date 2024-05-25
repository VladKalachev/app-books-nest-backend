import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [GenreController],
  imports: [DatabaseModule, JwtModule, ConfigModule],
  providers: [GenreService],
})
export class GenreModule {}
