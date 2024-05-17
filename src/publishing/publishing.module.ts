import { Module } from '@nestjs/common';
import { PublishingController } from './publishing.controller';
import { PublishingService } from './publishing.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [PublishingController],
  imports: [DatabaseModule],
  providers: [PublishingService],
})
export class PublishingModule {}
