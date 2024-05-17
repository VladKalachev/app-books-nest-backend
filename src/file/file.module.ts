import { Module } from '@nestjs/common';
import { FileService } from './file.service';

@Module({
  controllers: [],
  imports: [],
  providers: [FileService],
})
export class FileModule {}
