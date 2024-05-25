import { Module } from '@nestjs/common';
import { PublishingController } from './publishing.controller';
import { PublishingService } from './publishing.service';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PublishingController],
  imports: [DatabaseModule, JwtModule, ConfigModule],
  providers: [PublishingService],
})
export class PublishingModule {}
