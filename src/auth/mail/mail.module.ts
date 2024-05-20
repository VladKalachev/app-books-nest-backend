import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  controllers: [],
  imports: [],
  providers: [MailService],
})
export class MailModule {}
