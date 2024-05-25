import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';

@Module({
  controllers: [FileController],
  imports: [],
  providers: [FileService],
})
export class FileModule {}
