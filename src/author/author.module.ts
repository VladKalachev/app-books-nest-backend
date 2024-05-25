import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AuthorController],
  imports: [DatabaseModule, JwtModule, ConfigModule],
  providers: [AuthorService],
})
export class AuthorModule {}
