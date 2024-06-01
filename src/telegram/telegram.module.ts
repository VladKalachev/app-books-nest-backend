import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegrafModule } from 'nestjs-telegraf';
import * as LocalSession from 'telegraf-session-local';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTelegramConfig } from 'src/configs/telegram.config';
import { TelegramUpdate } from './telegram.update';
import { DatabaseModule } from 'src/database/database.module';

const sessions = new LocalSession({ database: 'session_db.json' });

@Module({
  controllers: [],
  imports: [
    DatabaseModule,
    TelegrafModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          middlewares: [sessions.middleware()],
          ...getTelegramConfig(configService),
        };
      },
    }),
  ],
  providers: [TelegramService, TelegramUpdate],
})
export class TelegramModule {}
