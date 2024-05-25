import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [FileController],
  imports: [JwtModule, ConfigModule],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
