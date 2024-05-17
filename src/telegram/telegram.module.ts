import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Module({
  controllers: [],
  imports: [],
  providers: [TelegramService],
})
export class TelegramModule {}
