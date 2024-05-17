import { Module } from '@nestjs/common';
import { PublishingController } from './publishing.controller';
import { PublishingService } from './publishing.service';

@Module({
  controllers: [PublishingController],
  imports: [],
  providers: [PublishingService],
})
export class PublishingModule {}
